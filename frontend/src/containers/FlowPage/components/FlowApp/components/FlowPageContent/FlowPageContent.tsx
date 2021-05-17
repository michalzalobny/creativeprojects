import React, { memo } from 'react';

import { PageData } from 'containers/FlowPage/data';
import { UpdateFlowItemsArray } from 'containers/FlowPage/components/FlowApp/FlowApp';
import { RevealButterflyString } from 'components/Animations/RevealButterflyString/RevealButterflyString';
import { RevealItem } from 'components/Animations/RevealItem/RevealItem';

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
import { SliderWrapper } from './styled/Slider/SliderWrapper';
import { SliderItem } from './styled/Slider/SliderItem';
import { ItemsWrapper } from './styled/Slider/ItemsWrapper';
import { UpdateSlideItemsArray } from '../../FlowApp';
import { TitleWrapper } from './styled/Header/TitleWrapper';
import { WordsWrapper } from './styled/Header/WordsWrapper';
import { SwipeWrapper } from './styled/Swipe/SwipeWrapper';
import { SwipeContainer } from './styled/Swipe/SwipeContainer';
import { SwipeLine } from './styled/Swipe/SwipeLine';
import { SwipeText } from './styled/Swipe/SwipeText';
import { SwipeCircle } from './styled/Swipe/SwipeCircle';

export interface FlowPageContentProps {
  pageData: PageData;
  updateFlowItemsArray: UpdateFlowItemsArray;
  updateRefsToOffset: (el: HTMLDivElement) => void;
  updateStickyRef: (el: HTMLDivElement) => void;
  updateStickyBorderRef: (el: HTMLDivElement) => void;
  updateSlideItemsArray: UpdateSlideItemsArray;
  isReady: boolean;
  showSlider: boolean;
}

export const FlowPageContent = memo<FlowPageContentProps>(props => {
  const {
    showSlider,
    isReady,
    updateSlideItemsArray,
    updateStickyBorderRef,
    updateStickyRef,
    updateRefsToOffset,
    updateFlowItemsArray,
    pageData,
    ...rest
  } = props;
  const { slideImages, asideDescription, flowItems, name } = pageData;

  return (
    <>
      <Wrapper {...rest}>
        <HeaderWrapper>
          <SwipeContainer
            animate={isReady && showSlider ? 'animate' : 'initial'}
          >
            <SwipeWrapper ref={el => updateRefsToOffset(el)}>
              <SwipeCircle />
              <SwipeLine />
              <RevealItem>
                <SwipeText text={'Swipe the images'} />
              </RevealItem>
            </SwipeWrapper>
          </SwipeContainer>

          <TitleWrapper>
            <HeaderTitle ref={el => updateRefsToOffset(el)}>
              <WordsWrapper>
                <RevealButterflyString
                  shouldAnimate={isReady}
                  text={'Any variation that fits your imagination'}
                />
              </WordsWrapper>
            </HeaderTitle>
          </TitleWrapper>

          <SliderWrapper>
            <ItemsWrapper>
              {slideImages.map((item, key) => {
                return (
                  <SliderItem
                    ref={refEl => updateSlideItemsArray({ refEl, image: item })}
                    key={item.url}
                  />
                );
              })}
            </ItemsWrapper>
          </SliderWrapper>
        </HeaderWrapper>
        <ContentWrapper>
          <InfoColumn>
            <div ref={el => updateStickyRef(el)}>
              <Description text={asideDescription} />
            </div>
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
                  <div ref={el => updateRefsToOffset(el)}>
                    <ImageDescription text={flowItem.description} />
                  </div>
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
