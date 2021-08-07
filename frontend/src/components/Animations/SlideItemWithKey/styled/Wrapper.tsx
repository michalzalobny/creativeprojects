import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Wrapper = styled(motion.div)<Props>`
  overflow: hidden;
  position: relative;
  transition: width 0.5s ease-out, height 0.5s ease-out;
  width: 100%;
`;
