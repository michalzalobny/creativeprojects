import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const ZoomWrapper = styled(motion.div)<Props>`
  position: fixed;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  bottom: 5%;
`;
