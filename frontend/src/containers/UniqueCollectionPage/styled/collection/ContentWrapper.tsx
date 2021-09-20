import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const ContentWrapper = styled(motion.div)<Props>`
  position: absolute;
  top: 0;
  left: 50%;
  height: 100%;
  transform: translateX(-12.5rem);

  ${media.tablet} {
    transform: translateX(-23.5rem);
  }
`;
