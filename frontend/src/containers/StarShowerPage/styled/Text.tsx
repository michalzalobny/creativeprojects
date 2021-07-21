import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Text = styled(motion.h3)<Props>`
  font-size: 16px;
  color: white;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 2px;
`;
