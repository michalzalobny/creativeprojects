import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Wrapper = styled(motion.button)<Props>`
  position: relative;
  z-index: 10;
  background: transparent;
  cursor: pointer;
  user-select: none;
`;
