import styled from 'styled-components';
import { motion } from 'framer-motion';

import { TR_DURATION, TR_DELAY } from '../framerPresets';

interface Props {}

export const Wrapper = styled(motion.div)<Props>`
  overflow: hidden;
  position: relative;
  transition: all ${TR_DURATION}s;
  transition-delay: ${TR_DELAY}s;
`;
