import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const ImageWrapper = styled(motion.figure)<Props>`
  position: relative;
  opacity: 0;
  visibility: hidden;

  height: 38rem;
  width: 26rem;
  margin: 0 2rem;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  ${media.tablet} {
    height: 63.1rem;
    width: 44rem;
    margin: 0 5.5rem;
  }
`;
