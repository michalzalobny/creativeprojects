import styled from 'styled-components';

interface Props {}

export const Image = styled.img<Props>`
  position: absolute;
  width: 1px;
  height: 1px;
  top: 0;
  left: 0;
  object-fit: cover;
  opacity: 0;
  visibility: hidden;
  user-select: none;
  pointer-events: none;
`;
