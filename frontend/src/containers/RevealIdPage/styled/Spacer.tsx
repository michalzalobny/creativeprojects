import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Spacer = styled(motion.div)<Props>`
  width: 100%;
  height: 10rem;
`;
