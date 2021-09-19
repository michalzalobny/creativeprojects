import styled from 'styled-components';

import { media } from 'utils/responsive';

interface Props {}

export const DescriptionWrapper = styled.div<Props>`
  position: absolute;
  bottom: 0;
  left: 0;

  max-width: 30rem;
  margin: 2.5rem;

  ${media.tablet} {
    max-width: 40rem;
    margin: 7.5rem;
  }
`;
