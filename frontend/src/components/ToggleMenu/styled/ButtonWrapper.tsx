import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const ButtonWrapper = styled(motion.button)<Props>`
  cursor: pointer;
  z-index: 1;
  pointer-events: initial;
`;
