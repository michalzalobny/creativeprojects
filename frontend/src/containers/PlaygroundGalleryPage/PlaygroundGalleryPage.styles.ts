import styled from 'styled-components';

const MOBILE_GAP = 5;

export const GalleryWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-column-gap: ${MOBILE_GAP}vw;
  grid-row-gap: ${MOBILE_GAP * 1.3}vw;
  background: green;
  opacity: 0.5;
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
  background-color: #8ca1bc;
  user-select: none;
  pointer-events: none;
  overflow: hidden;
`;
