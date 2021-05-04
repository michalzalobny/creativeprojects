import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const ContentWrapper = styled(motion.div)<Props>`
  display: flex;
  align-items: flex-start;
`;
