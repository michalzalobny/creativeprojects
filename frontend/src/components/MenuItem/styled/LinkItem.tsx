import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const LinkItem = styled(motion.a)<Props>`
  color: black;
  font-size: 28px;
  text-align: left;
  display: block;
  position: relative;
  font-weight: 800;
  text-transform: capitalize;

  ${media.tablet} {
    font-size: 40px;
  }
`;
