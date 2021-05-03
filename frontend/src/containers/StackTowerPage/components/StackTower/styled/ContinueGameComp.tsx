import styled from 'styled-components';
import { motion } from 'framer-motion';

import { ContinueGame } from '../components/ContinueGame/ContinueGame';
import {
  springElastic,
  springMedium,
} from 'components/Animations/framerTransitions';

interface Props {}

export const ContinueGameComp = styled(ContinueGame)<Props>`
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

ContinueGameComp.defaultProps = {
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
        delay: 0.55,
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
