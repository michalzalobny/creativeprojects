import styled from 'styled-components';

import { NavArrowButton } from '../components/NavArrowButton/NavArrowButton';

interface Props {}

export const NavArrowNext = styled(NavArrowButton)<Props>`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
`;
