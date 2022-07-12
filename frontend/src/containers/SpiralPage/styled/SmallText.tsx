import styled from 'styled-components';

import { RichText } from 'components/RichText/RichText';
import { media } from 'utils/responsive';

interface Props {}

const strokeColor = '#D39B2A';

export const SmallText = styled(RichText)<Props>`
  font-size: 4vw;
  line-height: 5vw;
  font-weight: 800;
  text-transform: uppercase;
  text-align: center;
  width: 100%;

  color: ${strokeColor};

  ${media.tablet} {
    font-size: 0.9vw;
    line-height: 1.5vw;
  }
`;
