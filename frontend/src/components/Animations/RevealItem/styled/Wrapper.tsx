import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Wrapper = styled(motion.div)<Props>`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
`;
