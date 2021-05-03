import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springElastic } from 'components/Animations/framerTransitions';
import { media } from 'utils/responsive';

interface Props {}

export const ContentWrapper = styled(motion.div)<Props>`
  padding: ${(30 / 750) * 100}vw ${(60 / 750) * 100}vw;
  border-radius: ${(12 / 750) * 100}vw;
  border: 2px solid white;

  ${media.tablet} {
    padding: 20px 60px;
    border-radius: 12px;
  }
`;

ContentWrapper.defaultProps = {
  variants: {
    initial: {
      y: '0%',
    },
    animate: {
      y: '-20%',
    },
    exit: {},
  },

  transition: {
    ...springElastic,
  },
};
