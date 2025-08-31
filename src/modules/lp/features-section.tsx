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
    <section
      id="features"
      className="bg-accent dark:bg-card px-2 py-20 sm:px-4"
    >
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
          <Card className="text-center">
            <CardHeader className="text-btc">
              <Code className="mx-auto mb-4 size-12" />
              <CardTitle>Open Source</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Fully open-source and transparent. Contribute, customize, and
                trust the code you&apos;re using.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="text-btc">
              <Github className="mx-auto mb-4 h-12 w-12" />
              <CardTitle>GitHub Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Generate beautiful badges for your README files and project
                documentation with one click.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="text-btc">
              <Shield className="mx-auto mb-4 h-12 w-12" />
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
