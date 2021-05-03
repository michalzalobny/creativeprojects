import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const Item = styled(motion.div)<Props>`
  height: 60vh;
  width: 20vh;
  background: #7a21b6;
  margin: 20vh 0;

  color: white;
  font-size: 40px;
  text-align: center;

  ${media.tablet} {
    width: 80%;
    height: 40%;
    margin: 0;
  }
`;
