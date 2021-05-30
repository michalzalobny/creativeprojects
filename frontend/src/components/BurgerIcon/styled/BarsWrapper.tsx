import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const BarsWrapper = styled(motion.div)<Props>`
  width: 50%;
  height: 18%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
