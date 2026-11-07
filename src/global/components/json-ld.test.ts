import { describe, expect, it } from 'vitest';

import { serializeJsonLd } from './json-ld';

describe('serializeJsonLd', () => {
  it('cannot close the surrounding script tag', () => {
    const item = { name: 'Support </script><script>alert(1)</script>' };
    const output = serializeJsonLd(item);

    expect(output).not.toContain('</script>');
    expect(output).not.toContain('<');
    expect(JSON.parse(output)).toEqual(item);
  });

  it('escapes line separators and ampersands while staying valid JSON', () => {
    const ls = String.fromCharCode(0x2028);
    const ps = String.fromCharCode(0x2029);
    const item = { name: `a${ls}b${ps}c & <!--` };
    const output = serializeJsonLd(item);

    for (const char of [ls, ps, '&', '<', '>'])
      expect(output).not.toContain(char);
    expect(JSON.parse(output)).toEqual(item);
  });
});
