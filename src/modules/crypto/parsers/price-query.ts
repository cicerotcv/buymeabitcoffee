import { z } from 'zod';

export const PRICE_VALUE_MAX = 1_000_000;

/** USD amount accepted by /api/btc/price; strict decimal, no extra query text. */
export const PriceQueryParser = z.object({
  value: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/)
    .transform(Number)
    .pipe(z.number().positive().max(PRICE_VALUE_MAX))
    .default('1'),
});

export const parsePriceQuery = (searchParams: URLSearchParams) =>
  PriceQueryParser.safeParse({
    value: searchParams.get('value') ?? undefined,
  });

/** Upstream URL built from validated parts only. */
export const getBlockchainPriceUrl = (value: number) =>
  `https://blockchain.info/tobtc?${new URLSearchParams({
    currency: 'USD',
    value: String(value),
  })}`;
