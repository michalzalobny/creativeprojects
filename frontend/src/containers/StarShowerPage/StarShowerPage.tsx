import React, { useEffect, useRef } from 'react';

import { CanvasWrapper } from './styled/CanvasWrapper';
import { Wrapper } from './styled/Wrapper';
import { App } from './appClasses/App';

export default function StarShowerPage() {
  const rendererWrapperEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rendererWrapperEl.current) {
      return () => {};
    }
    const myApp = new App(rendererWrapperEl.current);

    return () => {
      myApp.destroy();
    };
  }, []);

  return (
    <>
      <Wrapper>
        <CanvasWrapper ref={rendererWrapperEl} />
      </Wrapper>
    </>
  );
}
