import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Wrapper = styled(motion.div)<Props>`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  user-select: none;
  background: rgb(22, 22, 22);
`;
