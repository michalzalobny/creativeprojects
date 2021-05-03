import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const CodeWrapper = styled(motion.div)<Props>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
