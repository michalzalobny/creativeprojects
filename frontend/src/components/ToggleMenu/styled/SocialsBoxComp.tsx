import styled from 'styled-components';

import { SocialsBox } from 'components/SocialsBox/SocialsBox';

interface Props {
  offsetPadding: number;
}

export const SocialsBoxComp = styled(SocialsBox)<Props>`
  position: absolute;
  bottom: ${props => props.offsetPadding / 3}px;
  left: ${props => props.offsetPadding / 2}px;
`;
