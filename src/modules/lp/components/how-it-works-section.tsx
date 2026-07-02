'use server';

import { Copy, Share2, Wallet } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '$/components/ui/card';

const steps = [
  {
    step: 1,
    icon: Wallet,
    title: 'Enter your address',
    description:
      'Add your Bitcoin address and an optional Lightning address or URL.',
  },
  {
    step: 2,
    icon: Copy,
    title: 'Copy your link or badge',
    description:
      'Get a shareable donation page URL and an embeddable badge snippet.',
  },
  {
    step: 3,
    icon: Share2,
    title: 'Share anywhere',
    description:
      'Post on GitHub, your site, or social — donors pay you directly.',
  },
] as const;

export const HowItWorksSection = async () => {
  return (
    <section id="how-it-works" className="px-2 py-20 sm:px-4">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-4 text-4xl font-bold">
            How it works
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Three steps from wallet address to live donation page.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map(({ step, icon: Icon, title, description }) => (
            <Card
              key={step}
              variant="glass"
              className="text-center transition-all hover:shadow-md"
            >
              <CardHeader className="text-btc">
                <span
                  className="text-muted-foreground mb-2 block text-sm
                    font-semibold tracking-wide uppercase"
                >
                  Step {step}
                </span>
                <Icon
                  className="shadow-btc/20 mx-auto mb-4 h-12 w-12
                    drop-shadow-sm"
                />
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
