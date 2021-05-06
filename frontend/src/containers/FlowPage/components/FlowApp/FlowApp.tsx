import React, { memo, useRef } from 'react';

import { PageData } from 'containers/FlowPage/data';
import { CreativeItem } from 'utils/types/strapi/CreativeItem';

import { Wrapper } from './styled/Wrapper';
import { useScroll } from './customScroll/hooks/useScroll';
import { FlowPageContentComp } from './styled/FlowPageContentComp';
import { FlowPageContentWrapper } from './styled/FlowPageContentWrapper';
import { CanvasSectionComp } from './styled/CanvasSectionComp';

interface FlowAppProps {
  pageData: PageData;
}

export interface FlowItemRef {
  refEl: HTMLDivElement;
  flowItem: CreativeItem;
}

export type UpdateFlowItemsArray = (FlowItemRef) => void;

export const FlowApp = memo<FlowAppProps>(props => {
  const scrollWrapper = useRef<HTMLDivElement>(null);
  const { offsetYRef, offsetX, offsetY, seekTo } = useScroll({
    contentWrapperRef: scrollWrapper,
  });

  const flowItemsArray = useRef<FlowItemRef[]>([]);

  const updateFlowItemsArray = itemObj => {
    flowItemsArray.current = flowItemsArray.current.concat(itemObj);
  };

  return (
    <>
      <Wrapper>
        <FlowPageContentWrapper ref={scrollWrapper}>
          <FlowPageContentComp
            style={{ x: offsetX, y: offsetY }}
            updateFlowItemsArray={updateFlowItemsArray}
            pageData={props.pageData}
          />
          <CanvasSectionComp
            flowItemsArray={flowItemsArray}
            offsetYRef={offsetYRef}
            offsetX={offsetX}
            offsetY={offsetY}
          />
        </FlowPageContentWrapper>
      </Wrapper>
    </>
  );
});

FlowApp.displayName = 'FlowApp';
