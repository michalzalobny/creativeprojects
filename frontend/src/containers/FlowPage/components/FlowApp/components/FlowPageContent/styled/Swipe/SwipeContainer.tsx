import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const SwipeContainer = styled(motion.div)<Props>`
  position: absolute;
  bottom: 15%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);

  ${media.tablet} {
    top: 12%;
    bottom: initial;
    width: initial;
  }
`;
