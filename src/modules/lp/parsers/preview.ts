import { z } from 'zod';

import { btcAddressParser } from '@/modules/crypto/parsers/btc-address';
import { lightingAddressOrUrlParser } from '@/modules/crypto/parsers/lightning-address';

import { ZodUtils } from '@/global/utils/zod';

export const PreviewParser = z.object({
  identifier: ZodUtils.nonEmptyString('Identifier cannot be empty').max(100),
  btcAddress: btcAddressParser,
  lightningAddressOrUrl: lightingAddressOrUrlParser.or(z.literal('')),
});

export type PreviewSchema = z.infer<typeof PreviewParser>;
