import styled from 'styled-components';
import { motion } from 'framer-motion';

import { sharedValues } from 'utils/sharedValues';
import { springSlow } from 'components/Animations/framerTransitions';

interface Props {
  size: number;
  pos: number;
}

export const BackgroundComp = styled(motion.div)<Props>`
  z-index: -1;
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: ${sharedValues.colors.black};
  top: ${props => props.pos}px;
  left: ${props => props.pos}px;
  border-radius: 50%;
`;

BackgroundComp.defaultProps = {
  transition: {
    ...springSlow,
  },
};
