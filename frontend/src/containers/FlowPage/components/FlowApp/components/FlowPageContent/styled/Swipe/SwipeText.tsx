import styled from 'styled-components';

import { RichParagraph } from 'utils/styled/shared/RichParagraph';
import { media } from 'utils/responsive';

interface Props {}

export const SwipeText = styled(RichParagraph)<Props>`
  color: white;
  padding: 0 ${(50 / 375) * 100}vw;
  padding-bottom: ${(3 / 375) * 100}vw;
  white-space: nowrap;

  ${media.tablet} {
    padding: 0 60px;
    padding-bottom: 3px;
  }
`;
