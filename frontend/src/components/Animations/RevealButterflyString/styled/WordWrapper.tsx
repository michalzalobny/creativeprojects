import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const WordWrapper = styled(motion.span)<Props>`
  display: inline-block;
  margin-right: 0.2em;
`;
