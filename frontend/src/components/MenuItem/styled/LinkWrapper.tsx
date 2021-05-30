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
    },
    animate: {
      x: '-30px',
    },
  },

  transition: {
    ...springMedium,
  },
};
