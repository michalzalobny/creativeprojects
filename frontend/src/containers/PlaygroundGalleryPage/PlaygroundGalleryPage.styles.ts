import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

const VERTICAL_GAP = 10;
const HORIZONTAL_GAP = 40;
const EL_WIDTH = 13;

interface GallerySpacer {
  half?: boolean;
}

export const GalleryWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: ${VERTICAL_GAP * 2}vh;
  padding: ${VERTICAL_GAP}vh 0;
  opacity: 0;
  background: green;

  @media (min-width: 768px) {
    transform: translate(-50%, -50%) scale(1.2);
    grid-row-gap: ${VERTICAL_GAP * 2}vh;
    padding: ${VERTICAL_GAP}vh 0;
  }
`;

export const RowWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(9, min-content);
`;

export const GalleryItem = styled.div`
  position: relative;
  width: ${EL_WIDTH * 0.85}vh;

  &:before {
    content: '';
    display: block;
    width: 100%;
    padding-bottom: 100%;
  }

  background: red;

  @media (min-width: 768px) {
    width: ${EL_WIDTH}vh;
  }
`;

export const GallerySpacer = styled.div<GallerySpacer>`
  width: ${HORIZONTAL_GAP * 0.5}vh;

  ${props =>
    props.half &&
    css`
      width: 0;
    `}

  position: relative;
  background: pink;

  @media (min-width: 768px) {
    width: ${HORIZONTAL_GAP}vh;

    ${props =>
      props.half &&
      css`
        width: 0;
      `}
  }
`;

export const CanvasWrapper = styled(motion.div)`
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
  background-color: black;
  user-select: none;
  pointer-events: none;
  overflow: hidden;
`;
