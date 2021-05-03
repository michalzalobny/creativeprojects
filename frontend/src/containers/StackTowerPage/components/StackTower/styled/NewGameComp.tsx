import styled from 'styled-components';
import { motion } from 'framer-motion';

import { NewGame } from '../components/NewGame/NewGame';
import {
  springElastic,
  springMedium,
} from 'components/Animations/framerTransitions';

interface Props {}

export const NewGameComp = styled(NewGame)<Props>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

NewGameComp.defaultProps = {
  variants: {
    initial: {
      pointerEvents: 'none',
      opacity: 0,
      y: '-0%',
      x: '-50%',
      transition: {
        opacity: {
          type: 'tween',
        },
      },
    },
    animate: {
      pointerEvents: 'initial',
      opacity: 1,
      y: '-50%',
      x: '-50%',
      transition: {
        delay: 0.3,
        ...springElastic,
      },
    },
  },

  whileTap: {
    scale: 0,
    y: '-65%',
    x: '-50%',
    transition: {
      ...springMedium,
    },
  },

  transition: {
    ...springElastic,
  },
};
