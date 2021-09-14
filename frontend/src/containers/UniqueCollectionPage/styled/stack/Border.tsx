import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {
  currentIndex: number;
}

export const Border = styled(motion.div)<Props>`
  pointer-events: none;
  user-select: none;
  position: absolute;
  top: 0;
  left: 0;
  border: 2px solid black;
  height: 9vw;
  width: 23vw;
  border-radius: 10vw;
  transition: all 0.5s;
  transform: ${props => `translateX(${props.currentIndex * 24}vw)`};

  ${media.tablet} {
    width: 120px;
    height: 45px;
    border-radius: 30px;
    transform: ${props => `translateX(${props.currentIndex * 135}px)`};
  }
`;
