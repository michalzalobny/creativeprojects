import styled, { css } from 'styled-components';

import { media } from 'utils/responsive';

interface Props {
  hideMobile?: boolean;
  hideDesktop?: boolean;
}

export const DescriptionTitle = styled.h2<Props>`
  font-size: 3.5rem;
  color: white;
  font-family: '1';
  font-weight: 300;

  ${props =>
    props.hideMobile &&
    css`
      display: none;
    `}

  ${media.tablet} {
    font-size: 6rem;
    ${props =>
      props.hideMobile &&
      css`
        display: initial;
      `}

    ${props =>
      props.hideDesktop &&
      css`
        display: none;
      `}
  }
`;
