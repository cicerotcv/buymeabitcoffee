import { describe, expect, it } from 'vitest';

import {
  IDENTIFIER_MAX_LENGTH,
  LIGHTNING_MAX_LENGTH,
  parseDonationQuery,
} from './donation-query';

describe('parseDonationQuery', () => {
  it('keeps valid values, trimmed', () => {
    expect(
      parseDonationQuery({ identifier: '  Alice ', lightning: 'a@b.com' })
    ).toEqual({ identifier: 'Alice', lightning: 'a@b.com' });
  });

  it('drops oversized identifier and lightning', () => {
    const result = parseDonationQuery({
      identifier: 'x'.repeat(IDENTIFIER_MAX_LENGTH + 1),
      lightning: 'y'.repeat(LIGHTNING_MAX_LENGTH + 1),
    });

    expect(result).toEqual({ identifier: undefined, lightning: undefined });
  });

  it('drops empty and non-string values, takes the first of repeated params', () => {
    expect(parseDonationQuery({ identifier: '   ', lightning: 42 })).toEqual({
      identifier: undefined,
      lightning: undefined,
    });
    expect(parseDonationQuery({ identifier: ['First', 'Second'] })).toEqual({
      identifier: 'First',
      lightning: undefined,
    });
  });
});
