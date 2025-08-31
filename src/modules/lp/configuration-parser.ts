import validate from 'bitcoin-address-validation';
import { z } from 'zod';

export const parser = z.object({
  identifier: z.string().min(2).max(100),
  btcAddress: z
    .string()
    .min(42)
    .max(42)
    .refine((value) => validate(value)),
  label: z.string().min(2).max(32).optional().or(z.literal('')),
  content: z.string().min(2).max(32),
});

export type Schema = z.infer<typeof parser>;
