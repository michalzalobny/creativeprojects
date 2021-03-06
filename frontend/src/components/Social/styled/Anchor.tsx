import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Anchor = styled(motion.a)<Props>`
  user-select: none;
  font-size: 14px;
  color: white;
  opacity: 0.6;
`;
