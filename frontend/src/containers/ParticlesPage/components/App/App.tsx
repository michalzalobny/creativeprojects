import React, { memo, useRef, useEffect, useState } from 'react';

import { Wrapper } from './styled/Wrapper';
import { RendererWrapper } from './styled/RendererWrapper';
import { Cover } from './styled/Cover';
import { ContentWrapper } from './styled/ContentWrapper';
import { CreativeItem } from 'utils/types/strapi/CreativeItem';
import { Text } from './styled/Text';
import { ButterflyWithKey } from 'components/Animations/ButterflyWithKey/ButterflyWithKey';
import { TextWrapper } from './styled/TextWrapper';
import { Parallax } from 'components/Animations/Parallax/Parallax';

interface AppProps {
  creativeItems: CreativeItem[];
}

export const App = memo<AppProps>(props => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const scrollWrapper = useRef<HTMLDivElement>(null);

  const refsToOffset = useRef<HTMLDivElement[]>([]);

  const updateRefsToOffset = itemObj => {
    refsToOffset.current = refsToOffset.current.concat(itemObj);
  };

  const [isReady, setIsReady] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const { app } = require('./functions/app');
    const { destroy, init } = app({
      canvasRefEl: canvasRef.current,
      canvasWrapperRefEl: canvasWrapperRef.current,
      scrollWrapperRefEl: scrollWrapper.current,
      setIsReady,
      refsToOffset: refsToOffset.current,
      creativeItems: props.creativeItems,
      setCurrentSlide,
    });

    setTimeout(() => {
      setCurrentSlide(1);
    }, 1500);

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
        <ContentWrapper ref={scrollWrapper}></ContentWrapper>
        <TextWrapper>
          <Parallax>
            <Text>
              <ButterflyWithKey text={props.creativeItems[currentSlide].name} />
            </Text>
          </Parallax>
        </TextWrapper>

        <RendererWrapper ref={canvasWrapperRef}>
          <canvas ref={canvasRef} />
        </RendererWrapper>
      </Wrapper>
    </>
  );
});

App.displayName = 'App';
