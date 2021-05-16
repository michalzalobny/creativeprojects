import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const FinalWrapper = styled(motion.div)<Props>`
  width: 100%;

  height: 10vh;

  ${media.tablet} {
    height: 15vh;
  }
`;
