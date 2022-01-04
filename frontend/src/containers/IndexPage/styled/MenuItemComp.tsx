import styled from 'styled-components';

import { MenuItem } from 'components/MenuItem/MenuItem';

interface Props {}

export const MenuItemComp = styled(MenuItem)<Props>`
  &:not(:last-child) {
    margin-bottom: 50px;
  }
`;
