import styled from 'styled-components';

import { media } from 'utils/responsive';

interface Props {}

export const DescriptionText = styled.p<Props>`
  margin-top: 1rem;
  color: white;
  font-size: 1.4rem;
  line-height: 1.5;
  font-weight: 300;
  font-family: '2';

  ${media.tablet} {
    font-size: 1.7rem;
  }
`;
