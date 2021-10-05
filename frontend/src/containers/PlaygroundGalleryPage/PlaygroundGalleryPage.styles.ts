import styled, { css } from 'styled-components';

const MOBILE_GAP = 5;
const SPACER_WIDTH = 15;
const EL_WIDTH = 9;

interface GallerySpacer {
  half?: boolean;
}

export const GalleryWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: ${MOBILE_GAP * 2}vw;
  background: green;
  opacity: 0.5;
  padding: ${MOBILE_GAP}vw 0;
`;

export const RowWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(9, min-content);
`;

export const GalleryItem = styled.div`
  position: relative;
  width: ${EL_WIDTH}vw;
  &:before {
    content: '';
    display: block;
    width: 100%;
    padding-bottom: 100%;
  }
  background: red;
`;

export const GallerySpacer = styled.div<GallerySpacer>`
  width: ${SPACER_WIDTH}vw;
  ${props =>
    props.half &&
    css`
      width: ${SPACER_WIDTH / 2}vw;
    `}

  position: relative;
  background: pink;
`;

export const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const Wrapper = styled.div`
  position: relative;
  min-width: 100%;
  height: 100%;
  background-color: #fcf7eb;
  user-select: none;
  pointer-events: none;
  overflow: hidden;
`;
