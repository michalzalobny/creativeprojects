import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const MeasureWrapper = styled(motion.div)<Props>`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  width: 100%;
`;
