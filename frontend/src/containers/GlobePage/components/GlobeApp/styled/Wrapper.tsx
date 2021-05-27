import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Wrapper = styled(motion.div)<Props>`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  user-select: none;
  background: rgb(0, 57, 158);
  background: linear-gradient(-344deg, #001b4b 0%, #060b1d 50%, #56037c 100%);
`;
