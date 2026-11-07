import { describe, expect, it } from 'vitest';

import {
  getBlockchainPriceUrl,
  parsePriceQuery,
  PRICE_VALUE_MAX,
} from './price-query';

const parse = (query: string) => parsePriceQuery(new URLSearchParams(query));
const dataOf = (query: string) => {
  const result = parse(query);
  return result.success ? result.data : undefined;
};

describe('parsePriceQuery', () => {
  it('defaults to 1 and accepts plain amounts', () => {
    expect(dataOf('')).toEqual({ value: 1 });
    expect(dataOf('value=10')).toEqual({ value: 10 });
    expect(dataOf('value=2.50')).toEqual({ value: 2.5 });
  });

  it('rejects injection, non-numbers and out-of-range values', () => {
    expect(parse('value=1%26currency%3DEUR').success).toBe(false);
    expect(parse('value=abc').success).toBe(false);
    expect(parse('value=0').success).toBe(false);
    expect(parse('value=-5').success).toBe(false);
    expect(parse(`value=${PRICE_VALUE_MAX + 1}`).success).toBe(false);
  });
});

describe('getBlockchainPriceUrl', () => {
  it('only carries currency and value', () => {
    const url = new URL(getBlockchainPriceUrl(10));

    expect(url.origin).toBe('https://blockchain.info');
    expect([...url.searchParams.keys()]).toEqual(['currency', 'value']);
    expect(url.searchParams.get('value')).toBe('10');
  });
});
