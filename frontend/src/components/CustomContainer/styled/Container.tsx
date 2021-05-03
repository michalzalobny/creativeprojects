import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ContainerProps {
  maxWidth: number;
}

export const Container = styled(motion.div)<ContainerProps>`
  position: relative;
  margin: 0 auto;
  max-width: ${({ maxWidth }) => maxWidth}px;
  background-color: transparent;
`;
