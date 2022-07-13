import styled from 'styled-components';

import { media } from 'utils/responsive';

export const InspiredWrapper = styled.div`
  position: fixed;
  z-index: 35;
  top: 20px;
  right: 40px;
  display: flex;
  mix-blend-mode: difference;
  display: none;

  ${media.tablet} {
    display: initial;
  }
`;

export const InspiredText = styled.p`
  font-weight: 400;
  color: white;
  font-size: 14px;
  display: inline-block;

  ${media.tablet} {
    font-size: 14px;
    margin: 0 10px;
  }
`;
