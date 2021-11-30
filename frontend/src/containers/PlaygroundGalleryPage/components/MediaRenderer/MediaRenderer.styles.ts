import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled(motion.div)``;

export const Video = styled.video`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
`;

export const Image = styled.img`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
`;
