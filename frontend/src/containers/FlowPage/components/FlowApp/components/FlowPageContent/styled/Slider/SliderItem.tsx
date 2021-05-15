import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const SliderItem = styled(motion.div)<Props>`
  margin-right: 4vw;
  width: 55vw;

  ${media.tablet} {
    width: 26vw;
  }
  &:before {
    content: '';
    display: block;
    width: 100%;
    padding-bottom: 82%;
  }

  &:nth-child(2n + 1) {
    &:before {
      padding-bottom: 82%;
    }
  }

  &:nth-child(2n + 2) {
    &:before {
      padding-bottom: 125%;
    }
  }
  &:nth-child(2n + 4) {
    &:before {
      padding-bottom: 72%;
    }
  }

  &:nth-child(2n + 5) {
    &:before {
      padding-bottom: 110%;
    }
  }

  &:nth-child(2n + 6) {
    &:before {
      padding-bottom: 140%;
    }
  }
`;
