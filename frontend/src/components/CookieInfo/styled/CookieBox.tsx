import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springMedium } from 'components/Animations/framerTransitions';
import { sharedValues } from 'utils/sharedValues';

export const CookieBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  box-shadow: ${sharedValues.boxShadow.normal};
  border-radius: ${sharedValues.borderRadius.normal};
  z-index: 50;
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  margin-right: 2rem;
  max-width: 35rem;
  background-color: black;
  padding: 2.5rem;
`;

CookieBox.defaultProps = {
  variants: {
    initial: {
      y: '100%',
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: {
      opacity: 0,
      y: '-20%',
      transition: {
        ...springMedium,
      },
    },
  },
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
  transition: {
    ...springMedium,
    delay: 0.4,
    delayChildren: 0.2,
    staggerChildren: 0.2,
  },
};
