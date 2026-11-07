'use server';

import { PropsWithChildren } from 'react';

export const PageContainer = async (props: PropsWithChildren) => {
  return <div className="relative isolate min-h-dvh">{props.children}</div>;
};
