import styled from 'styled-components';
import { motion } from 'framer-motion';

import { sharedValues } from 'utils/sharedValues';
import { springVerySlow } from 'components/Animations/framerTransitions';

interface Props {}

export const BackgroundComp = styled(motion.div)<Props>`
  z-index: -1;
  position: absolute;
  width: 60px;
  height: 60px;
  background-color: ${sharedValues.colors.trueBlack};
  top: 20px;
  right: 20px;
  border-radius: 50%;
`;

BackgroundComp.defaultProps = {
  variants: {
    initial: {
      scale: 1,
    },
    animate: {
      scale: 35,
    },
  },

  transition: {
    ...springVerySlow,
  },
};
