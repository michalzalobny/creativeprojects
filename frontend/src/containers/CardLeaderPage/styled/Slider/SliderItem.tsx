import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';
import { sharedValues } from 'utils/sharedValues';

interface Props {}

export const SliderItem = styled(motion.div)<Props>`
  user-select: none;
  pointer-events: none;
  width: 15vw;
  background: #dbdbdb;
  position: relative;
  transform: translateX(20vw);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;

  &:before {
    content: '';
    display: block;
    width: 100%;
    padding-bottom: 155%;
  }

  ${media.tablet} {
    width: 5.5vw;
  }
`;
