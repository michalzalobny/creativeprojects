import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const ButtonContainer = styled(motion.div)<Props>`
  &:not(:last-child) {
    margin-right: 1vw;
  }

  ${media.tablet} {
    &:not(:last-child) {
      margin-right: 15px;
    }
  }
`;
