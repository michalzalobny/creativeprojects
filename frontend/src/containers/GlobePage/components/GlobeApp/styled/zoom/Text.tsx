import styled from 'styled-components';
import { motion } from 'framer-motion';

import { ZOOM_IN_THRESHOLD } from '../../constants';

interface Props {}

export const Text = styled(motion.p)<Props>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 14px;
  white-space: nowrap;
`;

Text.defaultProps = {
  variants: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  },

  transition: {
    type: 'tween',
    duration: ZOOM_IN_THRESHOLD / 1000,
  },
};
