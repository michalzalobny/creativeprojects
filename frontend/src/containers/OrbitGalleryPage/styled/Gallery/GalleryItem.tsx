import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const GalleryItem = styled(motion.figure)<Props>`
  width: 100%;
  position: relative;
  transform: scale(1);
  height: 22vw;
  margin-top: 6vw;
`;
