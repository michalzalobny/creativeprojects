import styled from 'styled-components';
import { motion } from 'framer-motion';

import { tween } from 'components/Animations/framerTransitions';

interface Props {}

export const ImageWrapper = styled(motion.div)<Props>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

ImageWrapper.defaultProps = {
  variants: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  },
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
  transition: {
    ...tween,
  },
};
