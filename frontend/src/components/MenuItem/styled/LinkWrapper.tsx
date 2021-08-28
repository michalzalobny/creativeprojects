import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springMedium } from 'components/Animations/framerTransitions';

interface Props {}

export const LinkWrapper = styled(motion.div)<Props>`
  width: 100%;
`;

LinkWrapper.defaultProps = {
  variants: {
    initial: {
      x: '0',
      opacity: 0.6,
    },
    animate: {
      x: '-15px',
      opacity: 1,
    },
  },

  transition: {
    ...springMedium,
  },
};
