import styled from 'styled-components';
import { motion } from 'framer-motion';

import { tween } from 'components/Animations/framerTransitions';

interface Props {}

export const ContentWrapper = styled(motion.div)<Props>`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

ContentWrapper.defaultProps = {
  variants: {
    initial: {
      opacity: 0,
      pointerEvents: 'none',
    },
    animate: {
      opacity: 1,
      pointerEvents: 'initial',
    },
  },
  initial: 'initial',
  transition: {
    delay: 3.4,
    ...tween,
    duration: 0.9,
  },
};
