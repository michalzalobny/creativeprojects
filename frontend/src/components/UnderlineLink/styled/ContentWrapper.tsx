import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const ContentWrapper = styled(motion.div)<Props>`
  mix-blend-mode: difference;
  position: relative;
  display: inline-block;
`;
