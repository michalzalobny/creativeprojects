import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const Button = styled(motion.button)<Props>`
  pointer-events: initial;
  cursor: pointer;
  color: black;
  font-size: 3vw;
  height: 9vw;
  width: 23vw;

  ${media.tablet} {
    font-size: 15px;
    width: 120px;
    height: 45px;
  }
`;
