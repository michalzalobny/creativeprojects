import styled from 'styled-components';

import { RichParagraph } from 'utils/styled/shared/RichParagraph';
import { media } from 'utils/responsive';

interface Props {}

export const SwipeText = styled(RichParagraph)<Props>`
  color: white;
  padding: 0 ${(70 / 375) * 100}vw;
  padding-bottom: ${(3 / 375) * 100}vw;

  ${media.tablet} {
    padding: 0 90px;
    padding-bottom: 3px;
  }
`;
