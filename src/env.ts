const defaultSiteUrl = 'https://buymeabitcoffee.vercel.app';
const defaultGithubUrl = 'https://github.com/cicerotcv/buymeabitcoffee';
const defaultExampleBtcAddress = 'bc1qw4q8nn7pknen33han7znsv6zhrrfta53sr86fw';

export const Env = {
  Prod: process.env.NODE_ENV === 'production',
  VercelUrl: process.env.NEXT_PUBLIC_VERCEL_URL ?? defaultSiteUrl,
  GithubUrl: process.env.NEXT_PUBLIC_GITHUB_URL ?? defaultGithubUrl,
  ExampleBtcAddress:
    process.env.NEXT_PUBLIC_EXAMPLE_BTC_ADDRESS ?? defaultExampleBtcAddress,
  ExampleLightningAddress:
    process.env.NEXT_PUBLIC_EXAMPLE_LIGHTNING_ADDRESS ?? '',
};
