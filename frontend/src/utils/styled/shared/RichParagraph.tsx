import styled from 'styled-components';

import { RichText } from 'components/RichText/RichText';
import { sharedValues } from 'utils/sharedValues';
import { media, computeValue } from 'utils/responsive';

export interface Props {}

const FONT_NORMAL = 16;
const FONT_BIGGER = 22;
const LINE_HEIGHT = 25;

export const RichParagraph = styled(RichText)<Props>`
  font-family: 'Playfair';
  color: black;
  font-size: ${(14 / 350) * 100}vw;
  line-height: ${(21 / 350) * 100}vw;

  // Desktop + tablet used to make the font legible
  ${media.tablet} {
    font-size: ${computeValue({
      pixelValue: FONT_BIGGER,
      referenceWidth: sharedValues.containers.normal.referenceWidth,
    })};

    line-height: ${computeValue({
      pixelValue: (FONT_BIGGER / FONT_NORMAL) * LINE_HEIGHT, //Preserve the proper design ratio
      referenceWidth: sharedValues.containers.normal.referenceWidth,
    })};
  }

  ${media.desktop} {
    font-size: ${computeValue({
      pixelValue: FONT_NORMAL,
      referenceWidth: sharedValues.containers.normal.referenceWidth,
    })};

    line-height: ${computeValue({
      pixelValue: LINE_HEIGHT,
      referenceWidth: sharedValues.containers.normal.referenceWidth,
    })};
  }

  ${media.custom(sharedValues.containers.normal.breakpoint)} {
    font-size: ${FONT_NORMAL}px;
    line-height: ${LINE_HEIGHT}px;
  }
`;
