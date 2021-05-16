import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const InfoColumn = styled(motion.div)<Props>`
  width: 0;
  display: none;

  ${media.tablet} {
    display: initial;
    width: 25%;
  }
`;
