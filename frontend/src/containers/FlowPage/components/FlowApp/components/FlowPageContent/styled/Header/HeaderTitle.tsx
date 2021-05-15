import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const HeaderTitle = styled(motion.h2)<Props>`
  font-family: 'Playfair';
  color: white;
  font-weight: 400;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  text-align: center;
  font-size: 12vw;

  ${media.tablet} {
    font-size: 5vw;
  }
`;
