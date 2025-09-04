import validate from 'bitcoin-address-validation';

import { ZodUtils } from '@/global/utils/zod';

export const btcAddressParser = ZodUtils.nonEmptyString(
  'BTC address is required'
).refine((value) => validate(value), { message: 'Invalid BTC address' });
