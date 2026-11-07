import { cn } from '$/lib/utils';

type Props = {
  value: string;
  className?: string;
  /**
   * inline: groups flow and wrap (decorative use).
   * grid: groups sit in aligned columns, first and last emphasized, which is
   * what people compare against their wallet.
   */
  layout?: 'inline' | 'grid';
};

/** Splits an address in groups of 4 so it reads like a printed code. */
const chunk = (value: string) => value.match(/.{1,4}/g) ?? [value];

/** Address printed in mono groups; the accessible name keeps it intact. */
export const PrintedAddress = ({ layout = 'inline', ...props }: Props) => {
  const groups = chunk(props.value);
  const last = groups.length - 1;

  return (
    <p
      aria-label={props.value}
      className={cn(
        'font-mono tracking-wide tabular-nums',
        layout === 'inline' && 'flex flex-wrap justify-center gap-x-2 text-xs',
        layout === 'grid' &&
          'grid grid-cols-4 gap-x-3 gap-y-1.5 text-[0.95rem] sm:grid-cols-6',
        props.className
      )}
    >
      {groups.map((group, index) => (
        <span
          key={`${group}-${index}`}
          aria-hidden
          className={cn(
            layout === 'grid' &&
              (index === 0 || index === last
                ? 'text-btc-ink font-semibold'
                : index % 2 === 0
                  ? 'text-foreground'
                  : 'text-muted-foreground')
          )}
        >
          {group}
        </span>
      ))}
    </p>
  );
};
