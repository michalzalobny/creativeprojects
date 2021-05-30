import styled from 'styled-components';

import { BurgerIcon } from 'components/BurgerIcon/BurgerIcon';

interface Props {}

export const BurgerIconComp = styled(BurgerIcon)<Props>`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10;
`;
