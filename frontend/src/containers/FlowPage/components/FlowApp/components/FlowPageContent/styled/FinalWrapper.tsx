import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const FinalWrapper = styled(motion.div)<Props>`
  width: 100%;
  background-color: black;
  height: 30vh;
  opacity: 0.4;
`;
