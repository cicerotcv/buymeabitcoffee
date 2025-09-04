import * as React from 'react';
import { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    height="24"
    width="24"
    {...props}
  >
    <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0Zm2.953 4.565a.462.462 0 0 0-.574.082l-7.5 7.969a.47.47 0 0 0 .34.791h3.114l-1.687 5.487a.466.466 0 0 0 .125.48.47.47 0 0 0 .663-.02l7.5-7.968a.468.468 0 0 0-.34-.791h-3.115l1.685-5.485a.466.466 0 0 0-.21-.545Z" />
  </svg>
);
export { SvgComponent as LightningIcon };
