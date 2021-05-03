import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springQuick } from 'components/Animations/framerTransitions';

import arrowSrc from '../images/arrow.svg';

interface Props {}

export const ArrowImage = styled(motion.img)<Props>`
  width: 39%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  backface-visibility: hidden;
`;

ArrowImage.defaultProps = {
  src: arrowSrc.src,

  variants: {
    initial: {
      x: '-50%',
      y: '-50%',
    },
    animate: {
      x: '-80%',
      y: '-50%',
    },
  },
  initial: 'initial',
  animate: 'animate',

  transition: {
    ...springQuick,
  },
};
