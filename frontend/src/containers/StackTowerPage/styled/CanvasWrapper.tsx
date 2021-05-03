import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const CanvasWrapper = styled(motion.div)<Props>`
  height: 100%;
  width: 100%;
  position: relative;
`;
