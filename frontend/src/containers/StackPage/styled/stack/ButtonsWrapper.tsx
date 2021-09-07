import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const ButtonsWrapper = styled(motion.div)<Props>`
  display: flex;
  position: relative;
  z-index: 1;
  margin: 5vw 0;

  ${media.tablet} {
    margin: 50px 0;
  }
`;
