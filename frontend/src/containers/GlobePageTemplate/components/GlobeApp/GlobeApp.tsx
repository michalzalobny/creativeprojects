import React, { memo, useRef, useEffect, useState } from 'react';

import { Wrapper } from './styled/Wrapper';
import { RendererWrapper } from './styled/RendererWrapper';
import { Cover } from './styled/Cover';
import { ContentWrapper } from './styled/ContentWrapper';

interface GlobeAppProps {}

export const GlobeApp = memo<GlobeAppProps>(props => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const scrollWrapper = useRef<HTMLDivElement>(null);

  const refsToOffset = useRef<HTMLDivElement[]>([]);

  const updateRefsToOffset = itemObj => {
    refsToOffset.current = refsToOffset.current.concat(itemObj);
  };

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const { app } = require('./functions/app');
    const { destroy, init } = app({
      canvasRefEl: canvasRef.current,
      canvasWrapperRefEl: canvasWrapperRef.current,
      scrollWrapperRefEl: scrollWrapper.current,
      setIsReady,
      refsToOffset: refsToOffset.current,
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
        <Cover animate={isReady ? 'animate' : 'initial'} />
        <ContentWrapper ref={scrollWrapper}>
          <div ref={ref => updateRefsToOffset(ref)}>test</div>
        </ContentWrapper>

        <RendererWrapper ref={canvasWrapperRef}>
          <canvas ref={canvasRef} />
        </RendererWrapper>
      </Wrapper>
    </>
  );
});

GlobeApp.displayName = 'GlobeApp';
