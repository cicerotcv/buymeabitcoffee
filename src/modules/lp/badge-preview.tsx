'use client';

import { useMemo, useState } from 'react';

import Image from 'next/image';

import { Check, Copy } from 'lucide-react';
import { toast } from 'sonner';

import { BadgeStyle } from '@/types/badge';

import { Button } from '$/components/ui/button';
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
  const [copied, setCopied] = useState(false);

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

  const copyBadgeMarkdown = () => {
    navigator.clipboard.writeText(markdown).then(() => {
      setCopied(true);
      toast.success('Markdown copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    });
  };

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

        <Button
          variant="outline"
          size="sm"
          onClick={copyBadgeMarkdown}
          className="w-full"
        >
          Copy Markdown{' '}
          {copied ? <Check className="text-green-500" /> : <Copy />}
        </Button>
      </CardContent>
    </Card>
  );
};
