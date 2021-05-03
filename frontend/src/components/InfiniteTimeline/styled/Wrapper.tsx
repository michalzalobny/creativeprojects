import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Wrapper = styled(motion.div)<Props>`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;
