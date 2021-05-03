import styled from 'styled-components';
import { motion } from 'framer-motion';

import { sharedValues } from 'utils/sharedValues';

interface Props {}

export const CloseButtonContainer = styled(motion.button)<Props>`
  width: 2.3rem;
  height: 2.3rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  border-radius: 50%;
  transition: transform ${sharedValues.transitionTimes.normal};

  &:hover {
    transform: rotate(90deg);
  }
`;
