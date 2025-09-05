export const Env = {
  Prod: process.env.NODE_ENV === 'production',
  VercelUrl: process.env.NEXT_PUBLIC_VERCEL_URL!,
  GithubUrl: process.env.NEXT_PUBLIC_GITHUB_URL!,
  ExampleBtcAddress: process.env.NEXT_PUBLIC_EXAMPLE_BTC_ADDRESS!,
  ExampleLightningAddress: process.env.NEXT_PUBLIC_EXAMPLE_LIGHTNING_ADDRESS!,
};
