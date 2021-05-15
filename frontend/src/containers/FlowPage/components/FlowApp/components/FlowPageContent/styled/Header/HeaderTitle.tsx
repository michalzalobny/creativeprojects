import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const HeaderTitle = styled(motion.h2)<Props>`
  color: white;

  text-align: center;
  font-size: 12vw;

  ${media.tablet} {
    font-size: 5vw;
  }
`;
