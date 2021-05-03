import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import { springMedium } from 'components/Animations/framerTransitions';

interface Props {
  size: number;
}

export const Dot = styled(motion.div)<Props>`
  border-radius: 50%;
  background-color: white;

  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;

Dot.defaultProps = {
  variants: {
    initial: {
      scale: 1,
      opacity: 0.3,
    },
    animate: {
      scale: 1,
      opacity: 1,
    },
  },
  initial: 'initial',
  animate: 'animate',
  transition: {
    ...springMedium,
  },
};
