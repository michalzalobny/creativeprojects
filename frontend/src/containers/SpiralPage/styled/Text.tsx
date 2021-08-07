import styled from 'styled-components';

import { RichText } from 'components/RichText/RichText';
import { media } from 'utils/responsive';

interface Props {}

const strokeColor = '#0e5a04';

export const Text = styled(RichText)<Props>`
  font-size: 12vw;
  line-height: 10vw;
  font-weight: 800;
  text-transform: uppercase;
  text-align: center;
  width: 100%;
  color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: ${strokeColor};

  span {
    color: ${strokeColor};
    -webkit-text-stroke-width: initial;
    -webkit-text-stroke-color: initial;
  }

  ${media.tablet} {
    font-size: 4.5vw;
    line-height: 4vw;
  }
`;
