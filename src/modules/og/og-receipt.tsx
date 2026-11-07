import { OG_COLORS } from './og-theme';

type Row = { label: string; value: string };

type Props = {
  eyebrowRight: string;
  title?: string;
  address?: string;
  rows: Row[];
  width?: number;
};

const TOOTH = 14;
const TOOTH_RADIUS = 5;

/** Splits an address in groups of 4, like the printed address on the site. */
const chunk = (value: string) => value.match(/.{1,4}/g) ?? [value];

/** Row of page-colored dots that bites the receipt edge (Satori has no mask). */
const Teeth = ({ edge, width }: { edge: 'top' | 'bottom'; width: number }) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      [edge]: -TOOTH_RADIUS,
      width,
      height: TOOTH_RADIUS * 2,
      display: 'flex',
      justifyContent: 'space-around',
    }}
  >
    {Array.from({ length: Math.floor(width / TOOTH) }, (_, index) => (
      <div
        key={index}
        style={{
          width: TOOTH_RADIUS * 2,
          height: TOOTH_RADIUS * 2,
          borderRadius: TOOTH_RADIUS,
          background: OG_COLORS.background,
        }}
      />
    ))}
  </div>
);

const HashRule = () => (
  <div
    style={{
      display: 'flex',
      width: '100%',
      borderTop: `2px dashed ${OG_COLORS.rule}`,
    }}
  />
);

const Eyebrow = ({ children }: { children: string }) => (
  <span
    style={{
      fontFamily: 'Geist Mono',
      fontSize: 15,
      letterSpacing: 2,
      textTransform: 'uppercase',
      color: OG_COLORS.muted,
    }}
  >
    {children}
  </span>
);

/** The site's receipt, drawn with Satori-safe primitives. */
export const OgReceipt = ({ width = 400, ...props }: Props) => {
  const groups = props.address ? chunk(props.address) : [];
  const last = groups.length - 1;

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        width,
        padding: '36px 32px',
        background: OG_COLORS.paper,
        transform: 'rotate(-2deg)',
      }}
    >
      <Teeth edge="top" width={width} />
      <Teeth edge="bottom" width={width} />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Eyebrow>Receipt</Eyebrow>
        <Eyebrow>{props.eyebrowRight}</Eyebrow>
      </div>

      {props.title ? (
        <span
          style={{
            fontFamily: 'Instrument Serif',
            fontSize: 38,
            lineHeight: 1,
            color: OG_COLORS.ink,
          }}
        >
          {props.title}
        </span>
      ) : null}

      <HashRule />

      {groups.length ? (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            rowGap: 6,
            columnGap: 12,
            fontFamily: 'Geist Mono',
            fontSize: 19,
          }}
        >
          {groups.map((group, index) => (
            <span
              key={`${group}-${index}`}
              style={{
                color:
                  index === 0 || index === last
                    ? OG_COLORS.emphasis
                    : OG_COLORS.muted,
              }}
            >
              {group}
            </span>
          ))}
        </div>
      ) : null}

      {groups.length ? <HashRule /> : null}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {props.rows.map((row) => (
          <div
            key={row.label}
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 10,
              fontFamily: 'Geist',
              fontSize: 20,
              color: OG_COLORS.ink,
            }}
          >
            <span>{row.label}</span>
            {/* Satori has no dotted borders: the leader is a clipped row of dots. */}
            <div
              style={{
                display: 'flex',
                flex: 1,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                color: OG_COLORS.rule,
                fontFamily: 'Geist Mono',
                fontSize: 20,
                letterSpacing: 1,
              }}
            >
              {'.'.repeat(60)}
            </div>
            <span style={{ fontFamily: 'Geist Mono' }}>{row.value}</span>
          </div>
        ))}
      </div>

      <HashRule />

      <span
        style={{
          display: 'flex',
          justifyContent: 'center',
          fontFamily: 'Instrument Serif',
          fontSize: 34,
          color: OG_COLORS.ink,
        }}
      >
        Thank you.
      </span>
    </div>
  );
};
