import styled, { css } from 'styled-components';

import { sharedValues } from 'utils/sharedValues';
import { media, computeValue } from 'utils/responsive';

interface Props {
  italic?: boolean;
}

export const Text = styled.p<Props>`
  font-size: 5vw;
  white-space: nowrap;
  text-align: center;
  color: black;
  font-weight: 800;
  position: relative;
  z-index: 1;

  ${props =>
    props.italic &&
    css`
      font-family: 'Playfair';
      font-style: italic;
      font-weight: 400;
      font-size: 8vw;
    `}

  ${media.tablet} {
    font-size: ${computeValue({
      pixelValue: 38,
      referenceWidth: sharedValues.containers.normal.referenceWidth,
    })};
  }

  ${media.custom(sharedValues.containers.normal.breakpoint)} {
    font-size: 38px;
  }
`;
