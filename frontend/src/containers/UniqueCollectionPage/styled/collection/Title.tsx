import styled from 'styled-components';

import { media } from 'utils/responsive';

interface Props {}

export const Title = styled.h1<Props>`
  font-size: 2.5rem;
  color: white;
  font-family: '1';
  font-weight: 300;

  ${media.tablet} {
    font-size: 4rem;
  }
`;
