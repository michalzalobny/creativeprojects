import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const SliderItemChild = styled(motion.div)<Props>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200%;
  height: 200%;
  background: #568b80;
  opacity: 0.5;
`;