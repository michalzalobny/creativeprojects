import styled, { css } from 'styled-components';

import { media, computeValue } from 'utils/responsive';
import { sharedValues } from 'utils/sharedValues';

import { ForkSvg } from '../../svg/ForkSvg';

interface Props {
  secondaryItem?: boolean;
}

export const ForkSvgComp = styled(ForkSvg)<Props>`
  height: 100vw;
  color: white;
  opacity: 0.8;
  fill: currentColor;

  ${props =>
    props.secondaryItem &&
    css`
      opacity: 1;
      color: #ead1b9;
    `}

  ${media.tablet} {
    height: ${computeValue({
      pixelValue: 800,
      referenceWidth: sharedValues.containers.normal.referenceWidth,
    })};
  }

  ${media.custom(sharedValues.containers.normal.breakpoint)} {
    height: 800px;
  }
`;
