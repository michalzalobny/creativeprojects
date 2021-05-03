import styled from 'styled-components';
import { motion } from 'framer-motion';

import { tween } from 'components/Animations/framerTransitions';

interface Props {}

export const DayWrapper = styled(motion.div)<Props>`
  background: #30d7f7;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;

DayWrapper.defaultProps = {
  variants: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  },
  initial: 'initial',

  transition: {
    type: 'tween',
    duration: 1.5,
  },
};
