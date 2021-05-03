import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const LetterContainer = styled(motion.div)<Props>`
  overflow: hidden;
  display: inline-block;
`;
