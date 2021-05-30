import styled from 'styled-components';
import { motion } from 'framer-motion';

import { sharedValues } from 'utils/sharedValues';
import { springVerySlow } from 'components/Animations/framerTransitions';

interface Props {
  size: number;
  pos: number;
}

export const BackgroundComp = styled(motion.div)<Props>`
  z-index: -1;
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: ${sharedValues.colors.trueBlack};
  top: ${props => props.pos}px;
  right: ${props => props.pos}px;
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
