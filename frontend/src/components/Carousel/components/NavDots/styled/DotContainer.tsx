import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const DotContainer = styled(motion.button)<Props>`
  padding: 8px;
  cursor: pointer;
  background: transparent;
`;
