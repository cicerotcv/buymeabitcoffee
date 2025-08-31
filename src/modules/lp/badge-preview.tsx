import { useMemo } from 'react';

import Image from 'next/image';

import { BadgeStyle } from '@/types/badge';

import { getShieldsUrl } from '../crypto/utils/shields';

type Props = {
  content: string;
  label?: string;
  style: BadgeStyle;
};

export const BadgePreview = (props: Props) => {
  const url = useMemo(() => {
    return getShieldsUrl({
      content: props.content || 'Buy Me a BitCoffee',
      label: props.label,
      style: props.style,
    });
  }, [props]);

  return (
    <Image
      src={url}
      width={0}
      height={0}
      sizes="100vw"
      unoptimized
      className="mx-auto h-6 w-fit"
      alt="Buy Me a BitCoffee badge"
    />
  );
};
