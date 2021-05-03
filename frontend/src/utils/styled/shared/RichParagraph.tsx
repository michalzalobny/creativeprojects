import styled from 'styled-components';

import { RichText } from 'components/RichText/RichText';
import { sharedValues } from 'utils/sharedValues';
import { media, computeValue } from 'utils/responsive';

export interface Props {}

export const RichParagraph = styled(RichText)<Props>`
  font-size: ${(27 / 750) * 100}vw;
  line-height: ${(48 / 750) * 100}vw;

  // Desktop + tablet used to make the font legible
  ${media.tablet} {
    font-size: ${computeValue({
      pixelValue: 25,
      referenceWidth: sharedValues.containers.normal.referenceWidth,
    })};

    line-height: ${computeValue({
      pixelValue: (25 / 17) * 48, //Preserve the proper design ratio
      referenceWidth: sharedValues.containers.normal.referenceWidth,
    })};
  }

  ${media.desktop} {
    font-size: ${computeValue({
      pixelValue: 17,
      referenceWidth: sharedValues.containers.normal.referenceWidth,
    })};

    line-height: ${computeValue({
      pixelValue: 48,
      referenceWidth: sharedValues.containers.normal.referenceWidth,
    })};
  }

  ${media.custom(sharedValues.containers.normal.breakpoint)} {
    font-size: 17px;
    line-height: 48px;
  }
`;
