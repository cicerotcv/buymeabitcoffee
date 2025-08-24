'use client';

import { useQuery } from '@tanstack/react-query';

import { getUsdToBtc } from '@/modules/crypto/services/btc-price';

export const useLiveQuotation = (value?: number, enabled?: boolean) => {
  return useQuery({
    queryKey: ['btcPrice', value],
    queryFn: () => getUsdToBtc(value),
    refetchInterval: 1000 * 10, // 10 seconds
    staleTime: 1000 * 10, // 10 seconds
    refetchOnWindowFocus: true,
    enabled,
  });
};
