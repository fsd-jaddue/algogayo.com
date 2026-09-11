type JsonLdProps = {
  data: object | object[];
};

/** JSON-LD 구조화 데이터. `<` 를 이스케이프해 스크립트 삽입을 막는다. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
