import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Name = styled(motion.h2)<Props>`
  font-weight: 800;
  text-transform: uppercase;
  color: white;
  font-size: 30px;
`;
