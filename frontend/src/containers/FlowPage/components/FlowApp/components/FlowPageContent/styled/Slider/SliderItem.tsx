import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const SliderItem = styled(motion.div)<Props>`
  height: 50vw;
  width: 60vw;
  margin-right: 4vw;

  ${media.tablet} {
    height: 18vw;
    width: 28vw;
  }
`;
