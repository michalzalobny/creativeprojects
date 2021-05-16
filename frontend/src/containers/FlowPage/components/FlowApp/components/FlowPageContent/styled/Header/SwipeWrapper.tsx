import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const SwipeWrapper = styled(motion.div)<Props>`
  font-style: italic;
  font-weight: 800;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
`;
