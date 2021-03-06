/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="optimized-images-loader" />

declare module 'prefix';

declare module '*.glsl' {
  const value: string;
  export default value;
}

declare module '*.glb' {
  const value: string;
  export default value;
}

declare module '*.mp3' {
  const src: string;
  export default src;
}
