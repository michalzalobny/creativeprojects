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
import { FinalWrapper } from './styled/FinalWrapper';
import { FinalContainer } from './styled/FinalContainer';
import { HeaderWrapper } from './styled/Header/HeaderWrapper';
import { HeaderTitle } from './styled/Header/HeaderTitle';
import { HeaderTitleSpan } from './styled/Header/HeaderTitleSpan';
import { SliderWrapper } from './styled/Slider/SliderWrapper';
import { SliderItem } from './styled/Slider/SliderItem';
import { ItemsWrapper } from './styled/Slider/ItemsWrapper';

export interface FlowPageContentProps {
  pageData: PageData;
  updateFlowItemsArray: UpdateFlowItemsArray;
  updateRefsToOffset: (el: HTMLDivElement) => void;
  updateStickyRef: (el: HTMLDivElement) => void;
  updateStickyBorderRef: (el: HTMLDivElement) => void;
}

export const FlowPageContent = memo<FlowPageContentProps>(props => {
  const {
    updateStickyBorderRef,
    updateStickyRef,
    updateRefsToOffset,
    updateFlowItemsArray,
    pageData,
    ...rest
  } = props;
  const { asideDescription, flowItems, name } = pageData;
  return (
    <>
      <Wrapper {...rest}>
        <HeaderWrapper ref={el => updateRefsToOffset(el)}>
          <HeaderTitle>
            Any <HeaderTitleSpan>Variation</HeaderTitleSpan>
            <br></br>
            that fits your
            <HeaderTitleSpan> Imagination</HeaderTitleSpan>
          </HeaderTitle>
          <SliderWrapper>
            <ItemsWrapper>
              <SliderItem />
              <SliderItem />
              <SliderItem />
              <SliderItem />
              <SliderItem />
              <SliderItem />
              <SliderItem />
            </ItemsWrapper>
          </SliderWrapper>
        </HeaderWrapper>
        <ContentWrapper>
          <InfoColumn ref={el => updateStickyRef(el)}>
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
        <FinalContainer
          ref={el => {
            updateStickyBorderRef(el);
          }}
        >
          <FinalWrapper
            ref={el => {
              updateRefsToOffset(el);
            }}
          />
        </FinalContainer>
      </Wrapper>
    </>
  );
});

FlowPageContent.displayName = 'FlowPageContent';
