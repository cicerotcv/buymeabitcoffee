'use client';

import { useMemo, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { capitalCase } from 'change-case';
import { FormProvider, useForm } from 'react-hook-form';

import { CodeBlock } from '@/global/components/code-block';
import { CopyButton } from '@/global/components/copy-button';
import { TextInput } from '@/global/components/text-input';
import { HtmlIcon } from '@/global/svg/icons/html';
import { MarkdownIcon } from '@/global/svg/icons/markdown';
import { ShieldsIoIcon } from '@/global/svg/icons/shields-io';
import { BadgeStyle } from '@/types/badge';

import { Button } from '$/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '$/components/ui/card';
import { Separator } from '$/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '$/components/ui/tabs';

import { CustomBadgeParser, CustomBadgeSchema } from '../parsers/custom-badge';
import { getHtmlCode, getMarkdown } from '../utils/badge';
import { BadgePreview } from './badge-preview';

enum CodeStyle {
  Markdown = 'markdown',
  Html = 'html',
}

type Props = {
  onChainAddress: string;
  lightningAddressOrUrl?: string;
  identifier?: string;
};

export const BadgeCard = (props: Props) => {
  const [style, setStyle] = useState(BadgeStyle.Flat);
  const [content, setContent] = useState('Buy Me a BitCoffee');
  const [label, setLabel] = useState('Donate');

  const { onChainAddress, lightningAddressOrUrl, identifier } = props;

  const form = useForm<CustomBadgeSchema>({
    defaultValues: {
      content,
      label,
    },
    resolver: zodResolver(CustomBadgeParser),
  });

  const handleSubmit = form.handleSubmit(
    (data) => {
      setContent(data.content);
      setLabel(data.label || '');
    },
    (e) => {
      console.log(e);
    }
  );

  const markdown = useMemo(
    () =>
      getMarkdown({
        onChain: onChainAddress,
        lightning: lightningAddressOrUrl,
        content,
        label,
        identifier,
        style,
      }),
    [onChainAddress, content, label, identifier, style, lightningAddressOrUrl]
  );

  const htmlCode = useMemo(
    () =>
      getHtmlCode({
        onChain: onChainAddress,
        lightning: lightningAddressOrUrl,
        content: content,
        label,
        identifier,
        style,
      }),
    [onChainAddress, content, label, identifier, style, lightningAddressOrUrl]
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
        <FormProvider {...form}>
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
            <TextInput
              id="label"
              name="label"
              label="Label"
              placeholder="Donate"
              description='Optional label for your badge (left side), e.g. "Donate".'
            />

            <TextInput
              name="content"
              label="Content"
              placeholder="Buy me a BitCoffee"
              description="The right side text for your badge."
            />

            <Button className="col-span-full">Update Badge</Button>
          </form>
        </FormProvider>

        <Separator />

        <Tabs
          value={style}
          onValueChange={(style) => setStyle(style as BadgeStyle)}
          className="mt-4"
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

        <Tabs defaultValue={CodeStyle.Markdown}>
          <TabsList className="w-full">
            <TabsTrigger value={CodeStyle.Markdown}>
              Markdown <MarkdownIcon />
            </TabsTrigger>

            <TabsTrigger value={CodeStyle.Html}>
              HTML <HtmlIcon />
            </TabsTrigger>
          </TabsList>

          <TabsContent value={CodeStyle.Markdown} className="space-y-4">
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

          <TabsContent value={CodeStyle.Html} className="space-y-4">
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
        </Tabs>
      </CardContent>
    </Card>
  );
};
