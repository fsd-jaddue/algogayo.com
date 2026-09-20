export function JsonLd({ data }: { data: Record<string, unknown> }) {
  // "<"를 이스케이프해 </script> 삽입을 막는다.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
