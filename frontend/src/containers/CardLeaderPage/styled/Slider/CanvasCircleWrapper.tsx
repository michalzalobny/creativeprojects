import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const CanvasCircleWrapper = styled(motion.div)<Props>`
  display: none;

  ${media.tablet} {
    display: initial;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    mix-blend-mode: difference; //canvas elements need to be white
  }
`;
