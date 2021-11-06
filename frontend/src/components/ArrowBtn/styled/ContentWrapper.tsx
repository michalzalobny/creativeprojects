import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const ContentWrapper = styled(motion.div)<Props>`
  width: 70px;
  height: 70px;
  position: relative;
`;
