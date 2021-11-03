import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

const MOBILE_GAP = 3 * 2;
const SPACER_WIDTH = 14 * 2;
const EL_WIDTH = 6.5 * 2;

interface GallerySpacer {
  half?: boolean;
}

export const GalleryWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.2);
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: ${MOBILE_GAP * 2}vh;
  background: green;
  padding: ${MOBILE_GAP}vh 0;
  opacity: 0;
`;

export const RowWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(9, min-content);
`;

export const GalleryItem = styled.div`
  position: relative;
  width: ${EL_WIDTH}vh;
  &:before {
    content: '';
    display: block;
    width: 100%;
    padding-bottom: 100%;
  }

  background: red;
`;

export const GallerySpacer = styled.div<GallerySpacer>`
  width: ${SPACER_WIDTH}vh;
  ${props =>
    props.half &&
    css`
      /* width: ${SPACER_WIDTH / 2}vw; */
      width: ${0}vh; 
    `}

  position: relative;
  background: pink;
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
