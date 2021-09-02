import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const SliderItem = styled(motion.div)<Props>`
  width: 17.5vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;

  &:before {
    content: '';
    display: block;
    width: 100%;
    padding-bottom: 160%;
  }

  ${media.tablet} {
    width: 10vw;
  }

  ${media.desktop} {
    width: 5.8vw;
  }
`;
