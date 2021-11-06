import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const ContentWrapper = styled(motion.div)<Props>`
  padding: 5rem;

  ${media.tablet} {
    padding: 12rem 0;
    max-width: 130rem;
    margin: 0 auto;
  }
`;
