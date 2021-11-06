import styled, { css } from 'styled-components';

interface Props {
  fullSpace?: boolean;
}

export const Wrapper = styled.span<Props>`
  display: block;

  ${props =>
    props.fullSpace &&
    css`
      width: 100%;
      height: 100%;
    `}
`;
