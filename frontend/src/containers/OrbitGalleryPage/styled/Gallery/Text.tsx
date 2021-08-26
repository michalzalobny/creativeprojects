import styled from 'styled-components';
import { motion } from 'framer-motion';

import { sharedValues } from 'utils/sharedValues';
import { media } from 'utils/responsive';

interface Props {}

export const Text = styled(motion.h1)<Props>`
  font-family: 'Playfair';
  color: ${sharedValues.colors.trueWhite};
  font-size: 20vw;
  display: block;
  position: relative;
  font-weight: 300;
  white-space: nowrap;

  ${media.tablet} {
    font-size: 8vw;
  }
`;
