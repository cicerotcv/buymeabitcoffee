import { HashRule } from '@/global/components/receipt';

const steps = [
  'Scan the QR code with your Bitcoin wallet or copy the address.',
  "Enter the amount you'd like to donate in your wallet.",
  'Send the transaction. Your support will be greatly appreciated!',
] as const;

export const DonationPageInstruction = () => {
  return (
    <section aria-labelledby="how-to-send" className="space-y-5">
      <p id="how-to-send" className="eyebrow">
        How to send
      </p>

      <ol className="space-y-4">
        {steps.map((text, index) => (
          <li key={text} className="flex items-baseline gap-4">
            <span className="text-btc-ink font-mono text-sm">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="leading-relaxed">{text}</p>
          </li>
        ))}
      </ol>

      <HashRule />
    </section>
  );
};
