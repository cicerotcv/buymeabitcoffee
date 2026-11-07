type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
  /** CSP nonce for the inline script tag. */
  nonce?: string;
};

// Built from char codes so no raw separator ends up in this source file.
const LINE_SEPARATOR = new RegExp(String.fromCharCode(0x2028), 'g');
const PARAGRAPH_SEPARATOR = new RegExp(String.fromCharCode(0x2029), 'g');

/**
 * Serializes JSON-LD for an inline <script>. Escapes characters that could
 * close the tag or break JS parsing, so URL-derived values stay inert.
 */
export const serializeJsonLd = (item: unknown) =>
  JSON.stringify(item)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(LINE_SEPARATOR, '\\u2028')
    .replace(PARAGRAPH_SEPARATOR, '\\u2029');

export function JsonLd({ data, nonce }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          nonce={nonce}
          // Browsers hide the nonce attribute after load, so the client sees "".
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(item) }}
        />
      ))}
    </>
  );
}
