import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const SliderItemChild = styled(motion.div)<Props>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150%;
  height: 150%;
  background: green;
  opacity: 0;
`;
