'use server';

import { Code, Github, Shield } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '$/components/ui/card';

export const FeaturesSection = async () => {
  return (
    <section id="features" className="px-2 py-20 sm:px-4">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-card-foreground mb-4 text-4xl font-bold">
            Why Buy Me a BitCoffee?
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Built by developers, for developers. Open-source, secure, free, and
            easy to integrate.
          </p>
        </div>

        <div className="container grid gap-8 md:grid-cols-3">
          <Card
            variant="glass"
            className="text-center transition-all hover:shadow-md"
          >
            <CardHeader className="text-btc">
              <Code
                className="shadow-btc/20 mx-auto mb-4 size-12 drop-shadow-sm"
              />
              <CardTitle>Open Source</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Fully open-source and transparent. Contribute, customize, and
                trust the code you&apos;re using.
              </CardDescription>
            </CardContent>
          </Card>

          <Card
            variant="glass"
            className="text-center transition-all hover:shadow-md"
          >
            <CardHeader className="text-btc">
              <Github
                className="shadow-btc/20 mx-auto mb-4 h-12 w-12 drop-shadow-sm"
              />
              <CardTitle>GitHub Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Generate beautiful badges for your README files and project
                documentation with one click.
              </CardDescription>
            </CardContent>
          </Card>

          <Card
            variant="glass"
            className="text-center transition-all hover:shadow-md"
          >
            <CardHeader className="text-btc">
              <Shield
                className="shadow-btc/20 mx-auto mb-4 h-12 w-12 drop-shadow-sm"
              />
              <CardTitle>Secure & Simple</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Direct Bitcoin donations to your wallet. No middleman, no fees,
                complete control.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
