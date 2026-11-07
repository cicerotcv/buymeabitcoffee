import { z } from 'zod';

/** Same limit as the generator form (PreviewParser.identifier). */
export const IDENTIFIER_MAX_LENGTH = 100;
/** LNURLs are long bech32 strings; anything past this is not a real one. */
export const LIGHTNING_MAX_LENGTH = 1024;

const optionalText = (max: number) =>
  z.string().trim().min(1).max(max).optional().catch(undefined);

const DonationQueryParser = z.object({
  identifier: optionalText(IDENTIFIER_MAX_LENGTH),
  // Format is checked in the page (verification stamp), only size is bounded here.
  lightning: optionalText(LIGHTNING_MAX_LENGTH),
});

export type DonationQuery = z.infer<typeof DonationQueryParser>;

/**
 * Normalizes the donation page query. Invalid or oversized values become
 * undefined instead of failing the page.
 */
export const parseDonationQuery = (query: Record<string, unknown>) => {
  const pick = (value: unknown) => (Array.isArray(value) ? value[0] : value);

  return DonationQueryParser.parse({
    identifier: pick(query.identifier),
    lightning: pick(query.lightning),
  });
};
