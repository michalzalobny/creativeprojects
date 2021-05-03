import styled from 'styled-components';

import { NavArrowButton } from '../components/NavArrowButton/NavArrowButton';

interface Props {}

export const NavArrowPrev = styled(NavArrowButton)<Props>`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
`;
