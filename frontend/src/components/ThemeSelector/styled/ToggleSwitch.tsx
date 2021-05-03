import styled from 'styled-components';
import { motion } from 'framer-motion';

import { sharedValues } from 'utils/sharedValues';

interface Props {
  buttonWidth: number;
  buttonHeight: number;
}

export const ToggleSwitch = styled(motion.button)<Props>`
  position: relative;
  cursor: pointer;
  width: ${props => props.buttonWidth}px;
  height: ${props => props.buttonHeight}px;
  background-color: transparent;
  border-radius: 150px;
  overflow: hidden;
  box-shadow: ${sharedValues.boxShadow.normal};
  //Fix ios issues with border-radius
  mask-image: -webkit-radial-gradient(white, black);
`;
