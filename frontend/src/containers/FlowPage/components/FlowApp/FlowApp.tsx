import React, { memo, useRef, useEffect, useState } from 'react';

import { PageData } from 'containers/FlowPage/data';
import { CreativeItem } from 'utils/types/strapi/CreativeItem';

import { Wrapper } from './styled/Wrapper';
import { RendererWrapper } from './styled/RendererWrapper';
import { Cover } from './styled/Cover';
import { FlowPageContentComp } from './styled/FlowPageContentComp';
import { FlowPageContentWrapper } from './styled/FlowPageContentWrapper';
import { ImageMediaProps } from 'utils/types/Media';

interface FlowAppProps {
  pageData: PageData;
}

export interface FlowItem {
  refEl: HTMLDivElement;
  flowItem: CreativeItem;
}

export interface SlideItem {
  refEl: HTMLDivElement;
  image: ImageMediaProps;
}

export type UpdateSlideItemsArray = (itemObj: SlideItem) => void;

export type UpdateFlowItemsArray = (FlowItem) => void;

export const FlowApp = memo<FlowAppProps>(props => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const scrollWrapper = useRef<HTMLDivElement>(null);

  const flowItemsArray = useRef<FlowItem[]>([]);
  const slideItemsArray = useRef<SlideItem[]>([]);

  const refsToOffset = useRef<HTMLDivElement[]>([]);
  const stickyRef = useRef<HTMLDivElement>(null);
  const stickyBorderRef = useRef<HTMLDivElement>(null);

  const updateStickyRef = item => {
    stickyRef.current = item;
  };

  const updateStickyBorderRef = item => {
    stickyBorderRef.current = item;
  };

  const updateFlowItemsArray = itemObj => {
    flowItemsArray.current = flowItemsArray.current.concat(itemObj);
  };

  const updateSlideItemsArray = itemObj => {
    slideItemsArray.current = slideItemsArray.current.concat(itemObj);
  };

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
      flowItemsArray: flowItemsArray.current,
      slideItemsArray: slideItemsArray.current,
      refsToOffset: refsToOffset.current,
      stickyRef: stickyRef.current,
      stickyBorderRef: stickyBorderRef.current,
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
        <FlowPageContentWrapper ref={scrollWrapper}>
          <FlowPageContentComp
            updateStickyRef={updateStickyRef}
            updateStickyBorderRef={updateStickyBorderRef}
            updateRefsToOffset={updateRefsToOffset}
            updateFlowItemsArray={updateFlowItemsArray}
            updateSlideItemsArray={updateSlideItemsArray}
            pageData={props.pageData}
            isReady={isReady}
          />
        </FlowPageContentWrapper>

        <RendererWrapper ref={canvasWrapperRef}>
          <canvas ref={canvasRef} />
        </RendererWrapper>
      </Wrapper>
    </>
  );
});

FlowApp.displayName = 'FlowApp';
