import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const ImageWrapper = styled(motion.figure)<Props>`
  position: relative;
  opacity: 0;
  visibility: hidden;

  height: 30rem;
  width: 20rem;
  margin-right: 5rem;

  &:first-child {
    margin-left: 2.5rem;
  }

  &:last-child {
    margin-right: 0;
  }

  ${media.tablet} {
    height: 52rem;
    width: 36rem;
    margin-right: 11rem;

    &:first-child {
      margin-left: 5.5rem;
    }
  }
`;
