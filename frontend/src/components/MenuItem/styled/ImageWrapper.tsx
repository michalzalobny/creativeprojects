import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const ImageWrapper = styled(motion.div)<Props>`
  width: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;

  &:before {
    content: '';
    display: block;
    padding-bottom: 56.25%;
  }
`;
