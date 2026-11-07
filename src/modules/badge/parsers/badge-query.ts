import { z } from 'zod';

import { BadgeStyle } from '@/types/badge';

/** Above the form limit (32) so existing badges keep working, still bounded. */
export const BADGE_TEXT_MAX_LENGTH = 64;

const badgeText = (fallback: string) =>
  z
    .string()
    .trim()
    .max(BADGE_TEXT_MAX_LENGTH)
    .transform((value) => value || fallback)
    .default(fallback);

/** Query accepted by /api/btc before anything is forwarded to shields.io. */
export const BadgeQueryParser = z.object({
  label: badgeText('Donate'),
  content: badgeText('Buy Me a BitCoffee'),
  style: z.nativeEnum(BadgeStyle).default(BadgeStyle.Flat),
});

export type BadgeQuery = z.infer<typeof BadgeQueryParser>;

/** Reads the query from URLSearchParams; missing keys use the defaults. */
export const parseBadgeQuery = (searchParams: URLSearchParams) =>
  BadgeQueryParser.safeParse({
    label: searchParams.get('label') ?? undefined,
    content: searchParams.get('content') ?? undefined,
    style: searchParams.get('style') ?? undefined,
  });
