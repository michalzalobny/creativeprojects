import React, { memo, useRef, useEffect, useState } from 'react';

import { Wrapper } from './styled/Wrapper';
import { RendererWrapper } from './styled/RendererWrapper';
import { Cover } from './styled/Cover';
import { FlowPageContent } from './components/FlowPageContent/FlowPageContent';

import { application } from './functions/application';
import { ContentWrapper } from 'components/InfiniteTimeline/styled/ContentWrapper';

interface FlowAppProps {}

export const FlowApp = memo<FlowAppProps>(props => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const { destroy } = application({
      canvasRefEl: canvasRef.current,
      canvasWrapperRefEl: canvasWrapperRef.current,
      setIsReady,
    });

    return () => {
      destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Wrapper>
        <Cover animate={isReady ? 'animate' : 'initial'} />
        <FlowPageContent />

        <RendererWrapper ref={canvasWrapperRef}>
          <canvas ref={canvasRef} />
        </RendererWrapper>
      </Wrapper>
    </>
  );
});

FlowApp.displayName = 'FlowApp';
