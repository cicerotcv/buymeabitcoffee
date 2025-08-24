'use server';

import { PropsWithChildren } from 'react';

export const PageContainer = async (props: PropsWithChildren) => {
  return <div className="bg-background min-h-screen">{props.children}</div>;
};
