import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const ImageWrapperDetails = styled(motion.figure)<Props>`
  position: relative;
  width: 80%;

  &:before {
    content: '';
    display: block;
    padding-bottom: 155%;
  }

  ${media.tablet} {
    width: 54.4rem;

    &:before {
      content: '';
      display: block;
      padding-bottom: 145%;
    }
  }

  background: green;
`;
