import styled from 'styled-components';
import { motion } from 'framer-motion';

import { sharedValues } from 'utils/sharedValues';

interface Props {}

export const Wrapper = styled(motion.button)<Props>`
  color: white;

  font-size: 1.5rem;
  line-height: 1.5rem;
  cursor: pointer;
  padding: 0.5rem 0;
  display: inline-block;
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 100%;
    height: 2px;
    transform: translateX(-50%) scaleX(0);
    transform-origin: center left;
    background-color: purple;
    z-index: -1;
    transition: transform ${sharedValues.transitionTimes.normal};
  }

  &:hover {
    &::before {
      transform: translateX(-50%) scaleX(1);
    }
  }
`;
