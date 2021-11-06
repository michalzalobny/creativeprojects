import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const BackWrapper = styled(motion.div)<Props>`
  mix-blend-mode: difference;
  position: fixed;
  z-index: 20;
  left: 25px;
  top: 25px;
`;
