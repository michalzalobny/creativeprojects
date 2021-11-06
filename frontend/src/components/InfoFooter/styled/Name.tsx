import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const Name = styled(motion.h4)<Props>`
  font-weight: 400;
  color: white;
  font-size: 14px;
  text-transform: uppercase;

  ${media.tablet} {
    font-size: 14px;
  }
`;
