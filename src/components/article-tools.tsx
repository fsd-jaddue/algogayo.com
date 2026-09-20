"use client";

import { useState, type FormEvent } from "react";
import { switchingCost, unitCost } from "@/lib/calculations";

const money = (n: number) => new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 2 }).format(n);

export function UnitPriceCalculator() {
  const [values, setValues] = useState(["8900", "750", "100", "10900", "1000", "80"]);
  const [unit, setUnit] = useState("g");
  const [result, setResult] = useState<string | null>(null);
  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const [pa, qa, ua, pb, qb, ub] = values.map(Number);
    const a = unitCost({ price: pa, quantity: qa, usedPercent: ua });
    const b = unitCost({ price: pb, quantity: qb, usedPercent: ub });
    if (a === null || b === null) { setResult("가격·용량·사용 비율을 확인해주세요."); return; }
    const scale = unit === "개" ? 1 : 100;
    const difference = Math.abs(a - b) * scale;
    setResult(`실제 사용하는 ${scale}${unit}당 A는 ${money(a * scale)}원, B는 ${money(b * scale)}원입니다. ${difference < 0.005 ? "두 상품의 사용량당 비용이 같습니다." : `${a < b ? "A" : "B"}가 ${money(difference)}원 저렴합니다.`}`);
  }
  return (
    <section className="article-tool" aria-labelledby="unit-calculator-title">
      <p className="kicker">내 장바구니에 적용하기</p>
      <h2 id="unit-calculator-title">실제로 쓸 양까지 비교하는 계산기</h2>
      <p>쿠폰·배송비를 반영한 결제액과 총용량을 넣으세요. 80% 사용은 20%가 남아 버려진다는 가정입니다. 두 상품은 같은 단위와 사용 조건으로 비교하세요.</p>
      <form onSubmit={calculate}>
        <label className="tool-unit">비교 단위<select value={unit} onChange={(e) => { setUnit(e.target.value); setResult(null); }}><option value="g">g (100g당)</option><option value="mL">mL (100mL당)</option><option value="개">개 (1개당)</option></select></label>
        <div className="tool-grid">
          {["A", "B"].map((name, product) => <fieldset key={name}><legend>상품 {name}</legend>
            {["실제 결제액 (원)", `총용량 (${unit})`, "실제로 쓸 비율 (%)"].map((label, field) => {
              const i = product * 3 + field;
              return <label key={field}>{label}<input aria-label={`상품 ${name} ${label}`} type="number" inputMode="decimal" required min={field === 0 ? 0 : 0.01} max={field === 2 ? 100 : 1000000000} step="any" value={values[i]} onChange={(e) => { setValues(values.map((v, j) => j === i ? e.target.value : v)); setResult(null); }} /></label>;
            })}
          </fieldset>)}
        </div>
        <button className="button button--primary" type="submit">사용량 기준으로 비교</button>
      </form>
      <div className="tool-result" role="status">{result ?? "본문 예시를 넣어두었습니다. 값을 바꾸거나 비교 버튼을 누르세요."}</div>
      <p className="tool-note">입력값은 서버로 보내거나 저장하지 않습니다. 품질이나 제품 간 대체 가능성은 계산에 포함하지 않습니다.</p>
    </section>
  );
}

export function SwitchingCalculator() {
  const [values, setValues] = useState(["45000", "30000", "8000", "80000", "12"]);
  const [result, setResult] = useState<string | null>(null);
  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const [current, next, extras, upfront, months] = values.map(Number);
    const cost = switchingCost(current, next, extras, upfront, months);
    if (!cost) { setResult("금액과 비교 기간을 확인해주세요."); return; }
    setResult(`월 순절감액은 ${money(cost.monthly)}원, ${months}개월 전체의 ${cost.total >= 0 ? "절감액" : "추가 비용"}은 ${money(Math.abs(cost.total))}원입니다. ${cost.breakEven === null ? "월 절감액이 없어서 전환 비용을 회수하는 시점을 계산할 수 없습니다." : cost.breakEven === 0 ? "전환 비용이 없어 첫 달부터 절감됩니다." : `전환 비용은 ${cost.breakEven}개월째 회수됩니다.`}`);
  }
  const labels = ["현재 월 납부액 (원)", "변경 후 월 기본요금 (원)", "월 할인 감소·대체 비용 (원)", "위약금·설치 등 일회성 비용 (원)", "비교 기간 (개월)"];
  return <section className="article-tool" aria-labelledby="switch-calculator-title">
    <p className="kicker">전환 비용 따져보기</p><h2 id="switch-calculator-title">고정비 변경 전 계산기</h2>
    <p>가격이 비교 기간 내내 일정하다는 가정입니다. 프로모션 종료, 세금, 중도 변경 등으로 요금이 달라지면 기간을 나눠 별도로 계산하세요.</p>
    <form onSubmit={calculate}><div className="tool-fields">{labels.map((label, i) => <label key={label}>{label}<input type="number" required inputMode="numeric" min={i === 4 ? 1 : 0} max={i === 4 ? 120 : 1000000000} step="1" value={values[i]} onChange={(e) => { setValues(values.map((v, j) => j === i ? e.target.value : v)); setResult(null); }} /></label>)}</div><button className="button button--primary" type="submit">전체 비용 계산</button></form>
    <div className="tool-result" role="status">{result ?? "본문의 월 7,000원 절감 예시를 넣어두었습니다."}</div>
    <p className="tool-note">입력값은 서버로 보내거나 저장하지 않습니다. 계약 변경이나 해지를 실행하는 기능은 없습니다.</p>
  </section>;
}

export function ArticleChecklist({ items, slug }: { items: string[]; slug: string }) {
  const [checked, setChecked] = useState<string[]>([]);
  return <section className="checklist interactive-checklist" aria-labelledby="checklist-title">
    <p className="kicker">마치기 전에</p><h2 id="checklist-title">내 상황에 적용해 보기</h2>
    <p>확인한 항목을 표시하세요. 체크 상태는 새로고침하면 초기화됩니다.</p>
    <ul>{items.map((item) => <li key={item}><label><input type="checkbox" checked={checked.includes(item)} onChange={(e) => setChecked(e.target.checked ? [...checked, item] : checked.filter((value) => value !== item))} /><span>{item}</span></label></li>)}</ul>
    <p role="status">{checked.length} / {items.length}개 확인</p>
    <a className="text-link" href={`/worksheets/${slug}.txt`} download>빈 기록표 내려받기 (.txt) <span aria-hidden="true">↓</span></a>
  </section>;
}
