import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const Text = styled(motion.div)<Props>`
  font-size: 12vw;
  color: white;
  font-family: 'Playfair';
  position: relative;

  ${media.tablet} {
    font-size: 5vw;
  }
`;
