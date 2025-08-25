'use client';

import { useMemo } from 'react';

import Image from 'next/image';

import { CopyButton } from '@/global/components/copy-button';
import { BadgeStyle } from '@/types/badge';

import { Card, CardContent } from '$/components/ui/card';

import { getMarkdown, getShieldsIoUrl } from '../crypto/utils/urls';

type BadgePreviewProps = {
  style: BadgeStyle;
  address: string;
  content?: string;
  label?: string;
  identifier?: string;
};

export const BadgePreview = (props: BadgePreviewProps) => {
  const url = useMemo(() => {
    return getShieldsIoUrl({
      content: props.content || 'Buy Me a BitCoffee',
      label: props.label,
      style: props.style,
    });
  }, [props]);

  const markdown = useMemo(
    () =>
      getMarkdown({
        address: props.address,
        content: props.content || 'Buy Me a BitCoffee',
        label: props.label,
        style: props.style,
        identifier: props.identifier,
      }),
    [props]
  );

  return (
    <Card className="bg-card flex flex-col gap-2 rounded-md">
      <CardContent className="space-y-4">
        <Image
          src={url}
          width={0}
          height={0}
          sizes="100vw"
          unoptimized
          className="mx-auto h-6 w-fit"
          alt="Buy Me a BitCoffee badge"
        />

        <div
          className="bg-muted text-muted-foreground flex-1 rounded-md p-3
            font-mono text-xs break-all"
        >
          {markdown}
        </div>

        <CopyButton
          variant="outline"
          size="sm"
          className="w-full"
          contentSource={markdown}
        >
          Copy Markdown
        </CopyButton>
      </CardContent>
    </Card>
  );
};
