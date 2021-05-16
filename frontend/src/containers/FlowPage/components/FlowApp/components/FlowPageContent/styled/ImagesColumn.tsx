import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const ImagesColumn = styled(motion.div)<Props>`
  width: 100%;

  ${media.tablet} {
    width: 75%;
  }
`;
