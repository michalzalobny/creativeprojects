import React, { memo, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { Wrapper } from './styled/Wrapper';
import { RendererWrapper } from './styled/RendererWrapper';
import { Cover } from './styled/Cover';
import { ContentWrapper } from './styled/ContentWrapper';
import { ZoomWrapper } from './styled/zoom/ZoomWrapper';
import { RingSvg } from './styled/zoom/RingSvg';
import { RingWrapper } from './styled/zoom/RingWrapper';
import { ZOOM_IN_THRESHOLD } from './constants';
import { Text } from './styled/zoom/Text';

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
      setIsZoomed,
      refsToOffset: refsToOffset.current,
    });

    init();

    return () => {
      destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [animateCircleIn, setAnimateCircleIn] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const icon = {
    initial: {
      opacity: 0,
      pathLength: 0,
    },
    animate: {
      opacity: 1,
      pathLength: 1,
    },
  };

  useEffect(() => {
    const onTouchDown = () => {
      setAnimateCircleIn(true);
    };

    const onTouchUp = () => {
      setAnimateCircleIn(false);
    };

    window.addEventListener('mousedown', onTouchDown);
    window.addEventListener('mouseup', onTouchUp);

    window.addEventListener('touchstart', onTouchDown);
    window.addEventListener('touchend', onTouchUp);

    return () => {
      window.removeEventListener('mousedown', onTouchDown);
      window.removeEventListener('mouseup', onTouchUp);

      window.removeEventListener('touchstart', onTouchDown);
      window.removeEventListener('touchend', onTouchUp);
    };
  }, []);

  return (
    <>
      <Wrapper>
        <Cover animate={isReady ? 'animate' : 'initial'} />
        <ContentWrapper ref={scrollWrapper}>
          <ZoomWrapper>
            <RingWrapper>
              <Text
                animate={animateCircleIn && !isZoomed ? 'animate' : 'initial'}
              >
                zoom in
              </Text>
              <RingSvg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 87 87"
                {...props}
              >
                <g data-name="Layer 2">
                  <motion.path
                    d="M86.5 43.5a43 43 0 11-43-43 43 43 0 0143 43z"
                    fill="none"
                    stroke="#fff"
                    variants={icon}
                    transition={{
                      pathLength: {
                        type: 'tween',
                        duration: ZOOM_IN_THRESHOLD / 1000,
                      },
                      opacity: {
                        type: 'tween',
                        duration: ZOOM_IN_THRESHOLD / 1000 / 2,
                      },
                    }}
                    animate={
                      animateCircleIn && !isZoomed ? 'animate' : 'initial'
                    }
                  />
                </g>
              </RingSvg>
            </RingWrapper>
          </ZoomWrapper>
        </ContentWrapper>

        <RendererWrapper ref={canvasWrapperRef}>
          <canvas ref={canvasRef} />
        </RendererWrapper>

        {/* canvas used to get points for point map */}
        <canvas
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            visibility: 'hidden',
          }}
          id="canvas"
        />
      </Wrapper>
    </>
  );
});

GlobeApp.displayName = 'GlobeApp';
