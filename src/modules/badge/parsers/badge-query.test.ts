import { describe, expect, it } from 'vitest';

import { BadgeStyle } from '@/types/badge';

import { BADGE_TEXT_MAX_LENGTH, parseBadgeQuery } from './badge-query';

const parse = (query: string) => parseBadgeQuery(new URLSearchParams(query));
const dataOf = (query: string) => {
  const result = parse(query);
  return result.success ? result.data : undefined;
};

describe('parseBadgeQuery', () => {
  it('applies the defaults', () => {
    expect(dataOf('')).toEqual({
      label: 'Donate',
      content: 'Buy Me a BitCoffee',
      style: BadgeStyle.Flat,
    });
    expect(dataOf('label=&content=')?.label).toBe('Donate');
  });

  it('keeps valid custom values', () => {
    expect(dataOf('label=Tip&content=Coffee&style=social')).toEqual({
      label: 'Tip',
      content: 'Coffee',
      style: BadgeStyle.Social,
    });
  });

  it('rejects unknown styles and oversized text', () => {
    expect(parse('style=evil').success).toBe(false);
    expect(
      parse(`content=${'x'.repeat(BADGE_TEXT_MAX_LENGTH + 1)}`).success
    ).toBe(false);
  });
});
