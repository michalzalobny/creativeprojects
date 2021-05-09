import React, { memo, useRef, useEffect, useState } from 'react';

import { PageData } from 'containers/FlowPage/data';
import { CreativeItem } from 'utils/types/strapi/CreativeItem';

import { Wrapper } from './styled/Wrapper';
import { RendererWrapper } from './styled/RendererWrapper';
import { Cover } from './styled/Cover';
import { FlowPageContentComp } from './styled/FlowPageContentComp';
import { FlowPageContentWrapper } from './styled/FlowPageContentWrapper';

interface FlowAppProps {
  pageData: PageData;
}

export interface FlowItemRef {
  refEl: HTMLDivElement;
  flowItem: CreativeItem;
}

export type UpdateFlowItemsArray = (FlowItemRef) => void;

export const FlowApp = memo<FlowAppProps>(props => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const scrollWrapper = useRef<HTMLDivElement>(null);

  const flowItemsArray = useRef<FlowItemRef[]>([]);

  const updateFlowItemsArray = itemObj => {
    flowItemsArray.current = flowItemsArray.current.concat(itemObj);
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
            updateFlowItemsArray={updateFlowItemsArray}
            pageData={props.pageData}
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
