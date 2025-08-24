// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NextPage<Params = any, SearchParams = any> = (props: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) => Promise<React.ReactNode>;
