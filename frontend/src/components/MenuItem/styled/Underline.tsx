import styled from 'styled-components';
import { motion } from 'framer-motion';

import { sharedValues } from 'utils/sharedValues';
import { springSlow } from 'components/Animations/framerTransitions';

interface Props {}

export const Underline = styled(motion.div)<Props>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: ${sharedValues.colors.trueWhite};
  transform-origin: left;
  opacity: 0.5;
`;

Underline.defaultProps = {
  variants: {
    initial: {
      scaleX: 1,
    },
    animate: {
      scaleX: 0,
    },
  },

  transition: {
    ...springSlow,
  },
};
