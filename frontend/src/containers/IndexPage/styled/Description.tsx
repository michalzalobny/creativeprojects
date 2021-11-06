import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Description = styled(motion.p)<Props>`
  color: white;
  font-size: 14px;
  margin-top: 2px;
`;
