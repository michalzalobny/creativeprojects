import styled from 'styled-components';

import { RichParagraph } from 'utils/styled/shared/RichParagraph';
import { media, computeValue } from 'utils/responsive';
import { sharedValues } from 'utils/sharedValues';

interface Props {}

const PADDING = 70;

export const Description = styled(RichParagraph)<Props>`
  text-align: justify;
  padding-left: ${(PADDING / 350) * 100}vw;
  padding-right: ${(PADDING / 350) * 100}vw;
  padding-bottom: ${(PADDING / 350 / 2) * 100}vw;

  ${media.tablet} {
    padding-left: ${computeValue({
      pixelValue: PADDING,
      referenceWidth: sharedValues.containers.normal.referenceWidth,
    })};

    padding-right: ${computeValue({
      pixelValue: PADDING,
      referenceWidth: sharedValues.containers.normal.referenceWidth,
    })};

    padding-bottom: ${computeValue({
      pixelValue: PADDING / 2,
      referenceWidth: sharedValues.containers.normal.referenceWidth,
    })};
  }

  ${media.custom(sharedValues.containers.normal.breakpoint)} {
    padding-left: ${PADDING}px;
    padding-right: ${PADDING}px;
    padding-bottom: ${PADDING / 2}px;
  }

  a {
    color: currentColor;
  }
`;
