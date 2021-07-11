import React, { useEffect, useRef } from 'react';

import { CanvasWrapper } from './styled/CanvasWrapper';
import { Wrapper } from './styled/Wrapper';
import { App } from './appClasses/App';

export default function StarShowerPage() {
  const rendererWrapperEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const myApp = new App(rendererWrapperEl.current, squareRef.current);
    myApp.init();

    return () => {
      myApp.destroy();
    };
  }, []);

  const squareRef = useRef(null);

  return (
    <>
      <Wrapper>
        <div
          ref={squareRef}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 90,
            height: 90,
            background: 'red',
          }}
        />
        <CanvasWrapper ref={rendererWrapperEl} />
      </Wrapper>
    </>
  );
}
