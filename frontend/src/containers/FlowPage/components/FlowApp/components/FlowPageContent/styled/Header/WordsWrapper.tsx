import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const WordsWrapper = styled(motion.div)<Props>`
  display: flex;
  width: 90%;

  ${media.tablet} {
    width: 70%;
  }
`;
