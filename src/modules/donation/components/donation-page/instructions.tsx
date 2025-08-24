import { PropsWithChildren } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '$/components/ui/card';

export const DonationPageInstruction = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">How it works</CardTitle>
      </CardHeader>

      <CardContent className="text-muted-foreground space-y-3 text-sm">
        <Step step={1}>
          Scan the QR code with your Bitcoin wallet or copy the address
        </Step>

        <Step step={2}>
          Enter the amount you&apos;d like to donate in your wallet
        </Step>

        <Step step={3}>
          Send the transaction - your support will be greatly appreciated!
        </Step>
      </CardContent>
    </Card>
  );
};

type StepProps = {
  step: number;
};

const Step = (props: PropsWithChildren<StepProps>) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className="bg-primary text-primary-foreground mt-0.5 flex h-6 w-6
          shrink-0 items-center justify-center rounded-full text-xs font-bold"
      >
        {props.step}
      </div>

      <p>{props.children}</p>
    </div>
  );
};
