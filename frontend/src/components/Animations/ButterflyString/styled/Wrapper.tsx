import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Wrapper = styled(motion.span)<Props>`
  display: inline-block;
  cursor: pointer;
`;
