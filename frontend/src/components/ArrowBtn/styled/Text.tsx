import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Text = styled(motion.p)<Props>`
  font-size: 14px;
  color: white;
  font-weight: 400;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
