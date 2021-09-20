import styled from 'styled-components';

import { media } from 'utils/responsive';

interface Props {}

export const TitleWrapper = styled.div<Props>`
  position: absolute;
  top: 0;
  right: 0;

  margin: 2.5rem;

  ${media.tablet} {
    margin: 7.5rem;
  }
`;
