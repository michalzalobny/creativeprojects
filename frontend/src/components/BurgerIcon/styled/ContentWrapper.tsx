import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {
  size: number;
}

export const ContentWrapper = styled(motion.div)<Props>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  position: relative;
`;
