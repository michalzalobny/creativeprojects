import React, { useEffect, useRef } from 'react';

import { CanvasWrapper } from './styled/CanvasWrapper';
import { Wrapper } from './styled/Wrapper';

export default function BubblesPage(props) {
  const rendererWrapperEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { app } = require('./functions/app');
    const { destroy, init } = app({
      rendererWrapperEl: rendererWrapperEl,
    });

    init();
    return () => {
      destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Wrapper>
        <CanvasWrapper ref={rendererWrapperEl} />
      </Wrapper>
    </>
  );
}
