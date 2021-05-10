import React, { memo } from 'react';

import { PageData } from 'containers/FlowPage/data';
import { UpdateFlowItemsArray } from 'containers/FlowPage/components/FlowApp/FlowApp';

import { Wrapper } from './styled/Wrapper';
import { ContentWrapper } from './styled/ContentWrapper';
import { InfoColumn } from './styled/InfoColumn';
import { ImagesColumn } from './styled/ImagesColumn';
import { Description } from './styled/Description';
import { ImageWrapper } from './styled/ImageWrapper';
import { ImagePlaceholder } from './styled/ImagePlaceholder';
import { ImageItem } from './styled/ImageItem';
import { ImageDescription } from './styled/ImageDescription';

export interface FlowPageContentProps {
  pageData: PageData;
  updateFlowItemsArray: UpdateFlowItemsArray;
  updateRefsToOffset: (el: HTMLDivElement) => void;
}

export const FlowPageContent = memo<FlowPageContentProps>(props => {
  const { updateRefsToOffset, updateFlowItemsArray, pageData, ...rest } = props;
  const { asideDescription, flowItems, name } = pageData;
  return (
    <>
      <Wrapper {...rest}>
        <ContentWrapper>
          <InfoColumn ref={el => updateRefsToOffset(el)}>
            <Description>{asideDescription}</Description>
          </InfoColumn>
          <ImagesColumn>
            {flowItems.map((flowItem, _key) => {
              return (
                <ImageItem key={flowItem.name}>
                  <ImageWrapper
                    ref={refEl => updateFlowItemsArray({ refEl, flowItem })}
                  >
                    <ImagePlaceholder />
                  </ImageWrapper>
                  <ImageDescription ref={el => updateRefsToOffset(el)}>
                    {flowItem.description}
                  </ImageDescription>
                </ImageItem>
              );
            })}
          </ImagesColumn>
        </ContentWrapper>
      </Wrapper>
    </>
  );
});

FlowPageContent.displayName = 'FlowPageContent';
