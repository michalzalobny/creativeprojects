import React, { useEffect, useRef } from 'react';

import { CanvasWrapper } from './styled/CanvasWrapper';
import { Wrapper } from './styled/Wrapper';
import { App } from './classes/App';

export default function StarShowerPage() {
  const rendererWrapperEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const myApp = new App(rendererWrapperEl);
    myApp.init();

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
