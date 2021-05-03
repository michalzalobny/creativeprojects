import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const TimelineItemsWrapper = styled(motion.div)<Props>`
  display: flex;
  flex-direction: column;

  ${media.tablet} {
    flex-direction: row;
  }
`;
