import styled from 'styled-components';

const MOBILE_GAP = 4;

export const GalleryWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30%;
  transform: translate(-50%, -50%) scale(0.5);
  display: grid;

  grid-template-columns: repeat(8, 1fr);
  grid-auto-rows: min-content;
  /* grid-column-gap: ${MOBILE_GAP}vw; */
  grid-column-gap: 0vw;
  grid-row-gap: ${MOBILE_GAP * 2}vw;
  /* grid-row-gap: 0vw; */
  background: green;
  opacity: 0.5;
  padding: ${MOBILE_GAP}vw 0; //Fixes vertical looping
`;

export const GalleryItem = styled.div`
  width: 100%;
  position: relative;

  &:before {
    content: '';
    display: block;
    width: 100%;
    padding-bottom: 100%;
  }
  background: red;
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
