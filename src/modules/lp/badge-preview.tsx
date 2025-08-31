'use client';

import { useMemo, useState } from 'react';

import Image from 'next/image';

import { capitalCase } from 'change-case';

import { CopyButton } from '@/global/components/copy-button';
import { BadgeStyle } from '@/types/badge';

import { Card, CardContent } from '$/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '$/components/ui/tabs';

import { getMarkdown, getShieldsIoUrl } from '../crypto/utils/urls';

type BadgePreviewProps = {
  address: string;
  content?: string;
  label?: string;
  identifier?: string;
};

export const BadgePreview = (props: BadgePreviewProps) => {
  const [style, setStyle] = useState(BadgeStyle.Flat);

  const url = useMemo(() => {
    return getShieldsIoUrl({
      content: props.content || 'Buy Me a BitCoffee',
      label: props.label,
      style: style,
    });
  }, [props, style]);

  const markdown = useMemo(
    () =>
      getMarkdown({
        address: props.address,
        content: props.content || 'Buy Me a BitCoffee',
        label: props.label,
        identifier: props.identifier,
        style,
      }),
    [props, style]
  );

  return (
    <Card className="bg-card flex flex-col gap-2 rounded-md">
      <CardContent className="space-y-4">
        <Tabs
          value={style}
          onValueChange={(style) => setStyle(style as BadgeStyle)}
        >
          <TabsList className="w-full">
            <TabsTrigger value={BadgeStyle.Flat}>
              {capitalCase(BadgeStyle.Flat)}
            </TabsTrigger>
            <TabsTrigger value={BadgeStyle.FlatSquare}>
              {capitalCase(BadgeStyle.FlatSquare)}
            </TabsTrigger>
            <TabsTrigger value={BadgeStyle.ForTheBadge}>
              {capitalCase(BadgeStyle.ForTheBadge)}
            </TabsTrigger>
            <TabsTrigger value={BadgeStyle.Social}>
              {capitalCase(BadgeStyle.Social)}
            </TabsTrigger>
          </TabsList>
        </Tabs>

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
