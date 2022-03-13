import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const ContentWrapper = styled(motion.h1)<Props>`
  display: flex;
  align-items: center;
`;
