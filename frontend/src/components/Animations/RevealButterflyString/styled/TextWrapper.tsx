import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const TextWrapper = styled(motion.span)<Props>`
  font-size: inherit;
  font-weight: inherit;
  position: relative;
  display: inline-block;
`;
