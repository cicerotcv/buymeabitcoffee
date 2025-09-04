import { z } from 'zod';

import { ZodUtils } from '@/global/utils/zod';

export const lnAddressParser = ZodUtils.nonEmptyString(
  'Lightning Address is required'
).email({ message: 'Invalid Lightning Address' });

export const lnurlParser = ZodUtils.nonEmptyString(
  'Lightning URL is required'
).regex(/^lnurl1[0-9a-z]+$/i, { message: 'Invalid Lightning URL' });

export const lnPaymentUrlParser = ZodUtils.nonEmptyString(
  'Payment URL is required'
)
  .regex(/https?:\/\/[^\s]+\/\.well-known\/lnurlp\/[^\s]+/)
  .url({ message: 'Invalid Payment URL' });

export const lightingAddressOrUrlParser = z.union([
  lnAddressParser,
  lnurlParser,
]);
