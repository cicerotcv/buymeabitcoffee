import { z } from 'zod';

export const ZodUtils = {
  nonEmptyString: (message: string = 'This field is required') =>
    z.string().trim().min(1, { message: message }),
};
