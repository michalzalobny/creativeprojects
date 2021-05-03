import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const VideoWrapper = styled(motion.div)<Props>`
  position: relative;
  width: 100%;
  &:before {
    content: '';
    display: block;
    padding-bottom: 56.25%;
  }
`;
