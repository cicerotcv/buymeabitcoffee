'use client';

import { useMemo, useState } from 'react';

import { capitalCase } from 'change-case';

import { CodeBlock } from '@/global/components/code-block';
import { CopyButton } from '@/global/components/copy-button';
import { HtmlIcon } from '@/global/svg/icons/html';
import { MarkdownIcon } from '@/global/svg/icons/markdown';
import { ShieldsIoIcon } from '@/global/svg/icons/shields-io';
import { BadgeStyle } from '@/types/badge';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '$/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '$/components/ui/tabs';

import { getHtmlCode, getMarkdown } from '../crypto/utils/badge';
import { BadgePreview } from './badge-preview';

type Props = {
  address: string;
  content?: string;
  label?: string;
  identifier?: string;
};

export const BadgeCard = (props: Props) => {
  const [style, setStyle] = useState(BadgeStyle.Flat);

  const { address, content = 'Buy Me a BitCoffee', label, identifier } = props;

  const markdown = useMemo(
    () =>
      getMarkdown({
        address,
        content: content,
        label,
        identifier,
        style,
      }),
    [address, content, label, identifier, style]
  );

  const htmlCode = useMemo(
    () =>
      getHtmlCode({
        address,
        content: content,
        label,
        identifier,
        style,
      }),
    [address, content, label, identifier, style]
  );

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <ShieldsIoIcon className="size-5" />
          Your Shareable Badge
        </CardTitle>

        <CardDescription>
          Copy the code snippet below to embed the badge on your website or
          blog.
        </CardDescription>
      </CardHeader>

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

          <TabsContent value={BadgeStyle.Flat}>
            <BadgePreview
              content={content}
              label={label}
              style={BadgeStyle.Flat}
            />
          </TabsContent>

          <TabsContent value={BadgeStyle.FlatSquare}>
            <BadgePreview
              content={content}
              label={label}
              style={BadgeStyle.FlatSquare}
            />
          </TabsContent>

          <TabsContent value={BadgeStyle.ForTheBadge}>
            <BadgePreview
              content={content}
              label={label}
              style={BadgeStyle.ForTheBadge}
            />
          </TabsContent>

          <TabsContent value={BadgeStyle.Social}>
            <BadgePreview
              content={content}
              label={label}
              style={BadgeStyle.Social}
            />
          </TabsContent>
        </Tabs>

        <Tabs defaultValue="html">
          <TabsList className="w-full">
            <TabsTrigger value="html">
              HTML <HtmlIcon />
            </TabsTrigger>

            <TabsTrigger value="markdown">
              Markdown <MarkdownIcon />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="html" className="space-y-4">
            <CodeBlock>{htmlCode}</CodeBlock>

            <CopyButton
              variant="outline"
              size="sm"
              className="w-full"
              contentSource={htmlCode}
            >
              Copy
            </CopyButton>
          </TabsContent>

          <TabsContent value="markdown" className="space-y-4">
            <CodeBlock>{markdown}</CodeBlock>

            <CopyButton
              variant="outline"
              size="sm"
              className="w-full"
              contentSource={markdown}
            >
              Copy
            </CopyButton>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
