export type ProductInput = { price: number; quantity: number; usedPercent: number };

export function unitCost({ price, quantity, usedPercent }: ProductInput) {
  if (![price, quantity, usedPercent].every(Number.isFinite) || price < 0 || quantity <= 0 || usedPercent <= 0 || usedPercent > 100) return null;
  const cost = price / (quantity * usedPercent / 100);
  return Number.isFinite(cost) ? cost : null;
}

export function switchingCost(current: number, next: number, extras: number, upfront: number, months: number) {
  if (![current, next, extras, upfront, months].every(Number.isFinite) || [current, next, extras, upfront].some((n) => n < 0) || !Number.isInteger(months) || months < 1 || months > 120) return null;
  const monthly = current - next - extras;
  const total = monthly * months - upfront;
  if (!Number.isFinite(total)) return null;
  return { monthly, total, breakEven: monthly > 0 ? Math.ceil(upfront / monthly) : null };
}

export function annualPlanCost(monthlyPrice: number, annualPrice: number, monthsUsed: number) {
  if (![monthlyPrice, annualPrice, monthsUsed].every(Number.isFinite) || monthlyPrice <= 0 || annualPrice < 0 || !Number.isInteger(monthsUsed) || monthsUsed < 1 || monthsUsed > 12) return null;
  const monthlyTotal = monthlyPrice * monthsUsed;
  const breakEvenMonths = annualPrice / monthlyPrice;
  return {
    monthlyTotal,
    annualTotal: annualPrice,
    difference: monthlyTotal - annualPrice,
    breakEvenMonths,
    discountPercent: (1 - annualPrice / (monthlyPrice * 12)) * 100,
  };
}

export function overseasCardCost(amount: number, rate: number, brandPercent: number, servicePercent: number, dccPercent: number) {
  const percents = [brandPercent, servicePercent, dccPercent];
  if (![amount, rate, ...percents].every(Number.isFinite) || amount <= 0 || rate <= 0 || percents.some((n) => n < 0 || n > 20)) return null;
  const base = amount * rate;
  const feeRate = (brandPercent + servicePercent) / 100;
  const local = base * (1 + feeRate);
  const dcc = base * (1 + dccPercent / 100) * (1 + feeRate);
  return { base, local, dcc, difference: dcc - local };
}

const DAY_MS = 24 * 60 * 60 * 1000;

function parseDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d ? date : null;
}

/** 월말에서 더할 때는 그 달의 마지막 날로 맞춘다(8월 31일 + 6개월 = 2월 말일). */
function addMonths(date: Date, months: number) {
  const target = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + months, 1));
  const lastDay = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0)).getUTCDate();
  target.setUTCDate(Math.min(date.getUTCDate(), lastDay));
  return target;
}

const toDateString = (date: Date) => date.toISOString().slice(0, 10);

export function passportValidity(expiry: string, departure: string, returnDate: string, requiredMonths = 6, leadDays = 21) {
  const [exp, dep, ret] = [expiry, departure, returnDate].map(parseDate);
  if (!exp || !dep || !ret || ret < dep) return null;
  const requiredUntil = addMonths(ret, requiredMonths);
  return {
    sufficient: exp >= requiredUntil,
    requiredUntil: toDateString(requiredUntil),
    daysShort: exp >= requiredUntil ? 0 : Math.round((requiredUntil.getTime() - exp.getTime()) / DAY_MS),
    applyBy: toDateString(new Date(dep.getTime() - leadDays * DAY_MS)),
  };
}
