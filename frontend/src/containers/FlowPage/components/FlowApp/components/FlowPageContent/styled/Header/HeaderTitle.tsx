import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {
  absolute?: boolean;
}

export const HeaderTitle = styled(motion.h2)<Props>`
  font-family: 'Playfair';
  color: white;
  font-weight: 800;
  /* text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3); */

  text-align: center;
  font-size: 12vw;
  display: flex;
  justify-content: center;

  ${media.tablet} {
    font-size: 4.2vw;
  }
`;
