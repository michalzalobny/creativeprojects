import styled from 'styled-components';

import { InfoFooter } from 'components/InfoFooter/InfoFooter';
import { media } from 'utils/responsive';

interface Props {}

export const InfoFooterComp = styled(InfoFooter)<Props>`
  display: none;

  ${media.tablet} {
    display: initial;
  }
`;
