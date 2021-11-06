import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const ImageWrapper = styled(motion.div)<Props>`
  width: 10rem;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
  overflow: hidden;

  &:before {
    content: '';
    display: block;
    padding-bottom: 56.25%;
  }

  ${media.tablet} {
    width: 44rem;
  }
`;
