import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Wrapper = styled(motion.div)<Props>`
  mix-blend-mode: difference;
  position: fixed;
  z-index: 20;
  right: 40px;
  bottom: 25px;
`;
