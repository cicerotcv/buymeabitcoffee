'use server';

import { Github, Shield, Zap } from 'lucide-react';

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
            Everything you need to accept Bitcoin
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Free, open-source, and ready in under a minute. Built for creators,
            maintainers, and builders.
          </p>
        </div>

        <div className="container grid gap-8 md:grid-cols-3">
          <Card
            variant="glass"
            className="text-center transition-all hover:shadow-md"
          >
            <CardHeader className="text-btc">
              <Shield
                className="shadow-btc/20 mx-auto mb-4 h-12 w-12 drop-shadow-sm"
              />
              <CardTitle>Direct &amp; Private</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Donations go straight to your wallet. No accounts, no custody,
                and nothing stored on our servers.
              </CardDescription>
            </CardContent>
          </Card>

          <Card
            variant="glass"
            className="text-center transition-all hover:shadow-md"
          >
            <CardHeader className="text-btc">
              <Zap
                className="shadow-btc/20 mx-auto mb-4 h-12 w-12 drop-shadow-sm"
              />
              <CardTitle>Lightning + On-chain</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                One page for both. Donors scan a QR code or copy your address —
                whichever they prefer.
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
              <CardTitle>README-ready Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Generate shields.io-style badges in Markdown or HTML. Paste once
                into your repo or site.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
