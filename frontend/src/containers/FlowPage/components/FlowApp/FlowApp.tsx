import React, { memo, useRef, useEffect, useState } from 'react';

import { PageData } from 'containers/FlowPage/data';
import { CreativeItem } from 'utils/types/strapi/CreativeItem';

import { Wrapper } from './styled/Wrapper';
import { RendererWrapper } from './styled/RendererWrapper';
import { Cover } from './styled/Cover';
import { FlowPageContent } from './components/FlowPageContent/FlowPageContent';

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

  const flowItemsArray = useRef<FlowItemRef[]>([]);

  const updateFlowItemsArray = itemObj => {
    flowItemsArray.current = flowItemsArray.current.concat(itemObj);
  };

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const { application } = require('./functions/application');
    const { destroy } = application({
      canvasRefEl: canvasRef.current,
      canvasWrapperRefEl: canvasWrapperRef.current,
      setIsReady,
      flowItemsArray: flowItemsArray.current,
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
        <FlowPageContent
          updateFlowItemsArray={updateFlowItemsArray}
          pageData={props.pageData}
        />
        <RendererWrapper ref={canvasWrapperRef}>
          <canvas ref={canvasRef} />
        </RendererWrapper>
      </Wrapper>
    </>
  );
});

FlowApp.displayName = 'FlowApp';
