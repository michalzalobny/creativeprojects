import styled, { css } from 'styled-components';

interface Props {
  fullSpace?: boolean;
}

export const ContentWrapper = styled.span<Props>`
  display: block;
  overflow: hidden;
  position: relative;

  ${props =>
    props.fullSpace &&
    css`
      width: 100%;
      height: 100%;
    `}
`;
