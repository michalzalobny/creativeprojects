import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const AnimationWrapper = styled(motion.span)<Props>`
  display: flex;
  height: 100%;
  width: 100%;
`;
