import styled from 'styled-components';

import { media, computeValue } from 'utils/responsive';
import { sharedValues } from 'utils/sharedValues';

interface Props {}

export const ImageWrapper = styled.figure<Props>`
  position: relative;
  width: 70vw;

  &:before {
    content: '';
    display: block;
    width: 100%;
    padding-bottom: 150%;
  }

  ${media.tablet} {
    width: ${computeValue({
      pixelValue: 360,
      referenceWidth: sharedValues.containers.normal.referenceWidth,
    })};
  }

  ${media.custom(sharedValues.containers.normal.breakpoint)} {
    width: 360px;
  }
`;
