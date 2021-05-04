import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Wrapper = styled(motion.button)<Props>`
  cursor: pointer;
  z-index: 1;
`;
