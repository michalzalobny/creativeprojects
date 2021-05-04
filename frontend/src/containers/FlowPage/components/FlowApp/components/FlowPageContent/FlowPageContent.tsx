import React, { memo } from 'react';

import { Wrapper } from './styled/Wrapper';
import { ContentWrapper } from './styled/ContentWrapper';
import { InfoColumn } from './styled/InfoColumn';
import { ImagesColumn } from './styled/ImagesColumn';
import { Description } from './styled/Description';
import { ImageWrapper } from './styled/ImageWrapper';
import { ImagePlaceholder } from './styled/ImagePlaceholder';
import { ImageItem } from './styled/ImageItem';
import { ImageDescription } from './styled/ImageDescription';

export interface FlowPageContentProps {}

export const FlowPageContent = memo<FlowPageContentProps>(props => {
  const { ...rest } = props;
  return (
    <>
      <Wrapper {...rest}>
        <ContentWrapper>
          <InfoColumn>
            <Description>
              Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do
              eiusmod tempor incididunt aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in vol
            </Description>
          </InfoColumn>
          <ImagesColumn>
            <ImageItem>
              <ImageWrapper>
                <ImagePlaceholder />
              </ImageWrapper>
              <ImageDescription>Image 1 description</ImageDescription>
            </ImageItem>
            <ImageItem>
              <ImageWrapper>
                <ImagePlaceholder />
              </ImageWrapper>
              <ImageDescription>Image 2 description</ImageDescription>
            </ImageItem>
            <ImageItem>
              <ImageWrapper>
                <ImagePlaceholder />
              </ImageWrapper>
              <ImageDescription>Image 3 description</ImageDescription>
            </ImageItem>
          </ImagesColumn>
        </ContentWrapper>
      </Wrapper>
    </>
  );
});

FlowPageContent.displayName = 'FlowPageContent';
