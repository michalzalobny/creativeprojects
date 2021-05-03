import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const Text = styled(motion.p)<Props>`
  font-size: ${(30 / 750) * 100}vw;
  letter-spacing: ${(2 / 750) * 100}vw;
  font-weight: bold;
  white-space: nowrap;
  color: white;

  ${media.tablet} {
    font-size: 25px;
    letter-spacing: 2px;
  }
`;
