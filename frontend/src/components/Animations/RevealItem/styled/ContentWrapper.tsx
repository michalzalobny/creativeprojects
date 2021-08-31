import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springVerySlow } from 'components/Animations/framerTransitions';

interface Props {}

export const ContentWrapper = styled(motion.div)<Props>`
  position: relative;
`;

ContentWrapper.defaultProps = {
  variants: {
    initial: {
      y: '105%',
    },
    animate: {
      y: '0%',
    },
  },

  transition: {
    ...springVerySlow,
  },
};
