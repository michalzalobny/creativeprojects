import styled, { css } from 'styled-components';

import { media, computeValue } from 'utils/responsive';
import { sharedValues } from 'utils/sharedValues';

interface Props {
  italic?: boolean;
}

export const Text = styled.p<Props>`
  font-size: 8vw;
  text-align: center;
  color: black;
  font-weight: 800;

  ${props =>
    props.italic &&
    css`
      font-family: 'Playfair';
      font-style: italic;
      font-weight: 400;
    `}

  ${media.tablet} {
    font-size: ${computeValue({
      pixelValue: 44,
      referenceWidth: sharedValues.containers.normal.referenceWidth,
    })};
  }

  ${media.custom(sharedValues.containers.normal.breakpoint)} {
    font-size: 44px;
  }
`;
