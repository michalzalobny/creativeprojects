import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Wrapper = styled(motion.div)<Props>`
  position: relative;
  z-index: 10;
  background: transparent;
  user-select: none;
`;
