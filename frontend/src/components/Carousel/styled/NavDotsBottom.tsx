import styled from 'styled-components';

import { NavDots } from '../components/NavDots/NavDots';

interface Props {}

export const NavDotsBottom = styled(NavDots)<Props>`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
`;
