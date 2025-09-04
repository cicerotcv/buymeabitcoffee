import { z } from 'zod';

export const CustomBadgeParser = z.object({
  label: z
    .string()
    .trim()
    .min(2, {
      message: 'Label must be empty or at least 2 characters long',
    })
    .max(32, {
      message: 'Label must be at most 32 characters long',
    })
    .or(z.literal('')),
  content: z
    .string()
    .trim()
    .min(2, {
      message: 'Label must be at least 2 characters long',
    })
    .max(32, {
      message: 'Label must be at most 32 characters long',
    }),
});

export type CustomBadgeSchema = z.infer<typeof CustomBadgeParser>;
