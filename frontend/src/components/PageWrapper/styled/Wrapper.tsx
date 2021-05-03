import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Wrapper = styled(motion.div)<Props>`
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: none;
`;
