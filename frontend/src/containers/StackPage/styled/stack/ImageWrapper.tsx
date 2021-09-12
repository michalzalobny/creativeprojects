import styled from 'styled-components';

import { media } from 'utils/responsive';
import { sharedValues } from 'utils/sharedValues';

interface Props {}

export const ImageWrapper = styled.figure<Props>`
  position: relative;
  width: 70vw;

  &:before {
    content: '';
    display: block;
    width: 100%;
    padding-bottom: 140%;
  }

  ${media.tablet} {
    width: 650px;

    &:before {
      content: '';
      display: block;
      width: 100%;
      padding-bottom: 70%;
    }
  }

  ${media.custom(sharedValues.containers.normal.breakpoint)} {
    width: 650px;
  }
`;
