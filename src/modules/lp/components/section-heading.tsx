import { cn } from '$/lib/utils';

type Props = {
  eyebrow: string;
  /** Serif title; wrap the single emphasized word in <em>. */
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2';
};

/** Title formula from the art direction sheet: mono eyebrow, serif title, lead. */
export const SectionHeading = ({ as: Tag = 'h2', ...props }: Props) => {
  return (
    <div className={cn('max-w-xl', props.className)}>
      <p className="eyebrow mb-4">{props.eyebrow}</p>
      <Tag
        className="font-heading [&_em]:text-btc-ink
          text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.01em]
          [&_em]:italic"
      >
        {props.title}
      </Tag>
      {props.lead ? (
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
          {props.lead}
        </p>
      ) : null}
    </div>
  );
};

/** Shared horizontal frame for landing sections. */
export const sectionFrame = 'mx-auto w-full max-w-6xl px-4 sm:px-6';
