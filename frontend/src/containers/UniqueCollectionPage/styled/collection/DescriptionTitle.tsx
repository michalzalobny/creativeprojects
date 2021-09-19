import styled from 'styled-components';

import { media } from 'utils/responsive';

interface Props {}

export const DescriptionTitle = styled.h2<Props>`
  font-size: 3.5rem;
  color: white;
  font-family: '1';
  font-weight: 300;

  ${media.tablet} {
    font-size: 6rem;
  }
`;
