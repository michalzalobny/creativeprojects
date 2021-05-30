import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Wrapper = styled(motion.div)<Props>`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
`;
