import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const GalleryWrapper = styled(motion.div)<Props>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  grid-gap: 2vw;
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  opacity: 0.1;
`;
