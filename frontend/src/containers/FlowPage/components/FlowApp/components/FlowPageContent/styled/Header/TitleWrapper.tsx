import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const TitleWrapper = styled(motion.div)<Props>`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
`;
