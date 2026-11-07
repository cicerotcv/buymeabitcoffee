import { SvgLogo } from '@/global/svg/project-logo';

import { OG_COLORS } from './og-theme';

type Props = {
  eyebrow: string;
  /** Headline lines; wrap the emphasized word with <em> via OgEm. */
  headline: React.ReactNode;
  headlineSize: number;
  lead: string;
  receipt: React.ReactNode;
};

/** Italic orange word, the site's single emphasis style. */
export const OgEm = ({ children }: { children: string }) => (
  <span style={{ fontStyle: 'italic', color: OG_COLORS.emphasis }}>
    {children}
  </span>
);

/** Shared card: copy on the left, a tilted receipt on the right. */
export const OgLayout = (props: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 56,
        width: '100%',
        height: '100%',
        padding: '0 72px 0 80px',
        background: OG_COLORS.background,
        color: OG_COLORS.ink,
        fontFamily: 'Geist',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minWidth: 0,
        }}
      >
        <div style={{ display: 'flex', color: OG_COLORS.brand }}>
          <SvgLogo width={206} height={60} />
        </div>

        <span
          style={{
            marginTop: 40,
            fontFamily: 'Geist Mono',
            fontSize: 17,
            letterSpacing: 2.5,
            textTransform: 'uppercase',
            color: OG_COLORS.muted,
          }}
        >
          {props.eyebrow}
        </span>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 18,
            fontFamily: 'Instrument Serif',
            fontSize: props.headlineSize,
            lineHeight: `${Math.round(props.headlineSize * 1.04)}px`,
            letterSpacing: -0.5,
          }}
        >
          {props.headline}
        </div>

        <span
          style={{
            marginTop: 26,
            fontSize: 26,
            lineHeight: 1.4,
            color: OG_COLORS.muted,
          }}
        >
          {props.lead}
        </span>
      </div>

      <div style={{ display: 'flex' }}>{props.receipt}</div>
    </div>
  );
};
