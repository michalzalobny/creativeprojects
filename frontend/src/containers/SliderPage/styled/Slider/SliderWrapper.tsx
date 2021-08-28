import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const SliderWrapper = styled(motion.div)<Props>`
  margin: 0vh 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;
