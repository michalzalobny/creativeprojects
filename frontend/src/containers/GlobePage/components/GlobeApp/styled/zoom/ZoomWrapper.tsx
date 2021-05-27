import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const ZoomWrapper = styled(motion.div)<Props>`
  position: fixed;
  z-index: 1;
  right: 5%;
  top: 5%;

  ${media.tablet} {
    right: 10%;
    top: 10%;
  }
`;
