import styled from 'styled-components';

import { RichParagraph } from 'utils/styled/shared/RichParagraph';
import { media, computeValue } from 'utils/responsive';
import { sharedValues } from 'utils/sharedValues';

interface Props {}

export const ImageDescription = styled(RichParagraph)<Props>`
  padding-top: ${(15 / 350) * 100}vw;
  padding-bottom: ${(50 / 350) * 100}vw;

  ${media.tablet} {
    padding-top: ${computeValue({
      pixelValue: 15,
      referenceWidth: sharedValues.containers.normal.referenceWidth,
    })};

    padding-bottom: ${computeValue({
      pixelValue: 50,
      referenceWidth: sharedValues.containers.normal.referenceWidth,
    })};
  }

  ${media.custom(sharedValues.containers.normal.breakpoint)} {
    padding-top: 15px;
    padding-bottom: 50px;
  }
`;
