import styled from 'styled-components';
import { motion } from 'framer-motion';

import { sharedValues } from 'utils/sharedValues';

interface Props {}

export const Wrapper = styled(motion.button)<Props>`
  background-color: black;
  color: white;

  border-radius: 15rem;
  cursor: pointer;
  padding: 1.5rem 3rem;
  display: inline-block;
  position: relative;
  z-index: 1;
  box-shadow: 0 0 20px black;

  &::before {
    content: '';
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    background-color: inherit;
    z-index: -1;
    border-radius: inherit;
    transition-duration: ${sharedValues.transitionTimes.blobButton};
    transition-property: opacity, width, height;
  }

  &:hover {
    &::before {
      opacity: 0;
      width: calc(100% + 3.2rem);
      height: calc(100% + 3.2rem);
    }
  }
`;
