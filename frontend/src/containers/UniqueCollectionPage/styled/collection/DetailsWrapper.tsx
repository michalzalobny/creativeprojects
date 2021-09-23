import styled from 'styled-components';

import { media } from 'utils/responsive';

interface Props {}

export const DetailsWrapper = styled.div<Props>`
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: red;
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0.3;
`;
