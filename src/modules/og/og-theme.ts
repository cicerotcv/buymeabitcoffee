import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/** Standard social card size (Open Graph and X large image). */
export const OG_SIZE = { width: 1200, height: 630 } as const;

/**
 * Dark palette from globals.css (.dark) converted to hex: Satori does not
 * parse oklch. Keep in sync with the tokens there.
 */
export const OG_COLORS = {
  background: '#0d101b', // .dark --background (indigo base)
  ink: '#f2eee9', // .dark --foreground
  brand: '#fa8f19', // tone-1
  emphasis: '#fda856', // .dark --btc-ink
  rule: 'rgba(250, 143, 25, 0.4)', // .dark --rule
  muted: '#a4a7b5', // .dark --muted-foreground
  paper: '#151827', // .dark --card
} as const;

const fontFile = (name: string) =>
  readFile(join(process.cwd(), 'assets/og', name));

let fontsPromise: ReturnType<typeof loadFonts> | undefined;

const loadFonts = async () => {
  const [serif, serifItalic, sans, sansMedium, mono] = await Promise.all([
    fontFile('InstrumentSerif-Regular.ttf'),
    fontFile('InstrumentSerif-Italic.ttf'),
    fontFile('Geist-Regular.ttf'),
    fontFile('Geist-Medium.ttf'),
    fontFile('GeistMono-Regular.ttf'),
  ]);

  return [
    { name: 'Instrument Serif', data: serif, weight: 400, style: 'normal' },
    {
      name: 'Instrument Serif',
      data: serifItalic,
      weight: 400,
      style: 'italic',
    },
    { name: 'Geist', data: sans, weight: 400, style: 'normal' },
    { name: 'Geist', data: sansMedium, weight: 500, style: 'normal' },
    { name: 'Geist Mono', data: mono, weight: 400, style: 'normal' },
  ] as const;
};

/** Fonts for ImageResponse, read once per server instance. */
export const getOgFonts = async () => {
  fontsPromise ??= loadFonts();
  const fonts = await fontsPromise;
  return fonts.map((font) => ({ ...font }));
};
