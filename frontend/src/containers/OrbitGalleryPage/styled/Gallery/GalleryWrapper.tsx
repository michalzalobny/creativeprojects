import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const GalleryWrapper = styled(motion.div)<Props>`
  position: absolute;
  top: 0;
  left: 0;
  width: 150%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  opacity: 0.1;
`;
