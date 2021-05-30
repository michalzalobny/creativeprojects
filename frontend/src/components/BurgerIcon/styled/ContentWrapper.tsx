import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const ContentWrapper = styled(motion.div)<Props>`
  width: 60px;
  height: 60px;
  position: relative;
`;
