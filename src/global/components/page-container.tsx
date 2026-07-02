'use server';

import { PropsWithChildren } from 'react';

import { BackgroundMesh } from './background-mesh';

export const PageContainer = async (props: PropsWithChildren) => {
  return (
    <div className="bg-background relative min-h-screen">
      <BackgroundMesh />
      {props.children}
    </div>
  );
};
