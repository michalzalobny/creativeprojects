import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const VideoContainer = styled(motion.div)<Props>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
`;
