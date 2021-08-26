import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

const SPACING = 8;
const SIZE = 1.5;

export const TextWrapper = styled(motion.div)<Props>`
  position: relative;
  padding-right: ${SPACING}vh;

  &:before {
    content: '';
    position: absolute;
    right: ${SPACING / 2 - SIZE / 2}vh;
    top: 60%;
    width: ${SIZE}vh;
    height: ${SIZE}vh;
    transform: translateY(-50%);
    background: #ffffff;
    border-radius: 50%;
  }
`;
