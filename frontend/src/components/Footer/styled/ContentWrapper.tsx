import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ContentWrapperProps {}

export const ContentWrapper = styled(motion.div)<ContentWrapperProps>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;
