import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const BarsWrapper = styled(motion.div)<Props>`
  width: 40%;
  height: 15%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
