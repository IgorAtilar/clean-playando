declare module '*.svg' {
  import React from 'react';

  const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
  export { SVG as ReactComponent };
  export default SVG;
}
