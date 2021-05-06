import React, { memo, useRef, useState, useEffect } from 'react';
import { MotionValue } from 'framer-motion';

import { Wrapper } from './styled/Wrapper';
import { RendererWrapper } from './styled/RendererWrapper';
import { Cover } from './styled/Cover';
import { FlowItemRef } from '../../FlowApp';

export interface CanvasSectionProps {
  flowItemsArray: React.MutableRefObject<FlowItemRef[]>;
  offsetX: MotionValue<number>;
  offsetY: MotionValue<number>;
}

export const CanvasSection = memo<CanvasSectionProps>(props => {
  const { offsetX, offsetY, flowItemsArray } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const { application } = require('./functions/application');
    const { destroy } = application({
      canvasRefEl: canvasRef.current,
      canvasWrapperRefEl: canvasWrapperRef.current,
      setIsReady,
      flowItemsArray: flowItemsArray.current,
      offsetX,
      offsetY,
    });

    return () => {
      destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { ...rest } = props;
  return (
    <>
      <Wrapper {...rest}>
        <Cover animate={isReady ? 'animate' : 'initial'} />
        <RendererWrapper ref={canvasWrapperRef}>
          <canvas ref={canvasRef} />
        </RendererWrapper>
      </Wrapper>
    </>
  );
});

CanvasSection.displayName = 'CanvasSection';
