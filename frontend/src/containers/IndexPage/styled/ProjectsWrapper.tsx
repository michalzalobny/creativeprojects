import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const ProjectsWrapper = styled(motion.div)<Props>`
  margin-top: 3.5rem;

  ${media.tablet} {
    margin-top: 8rem;
  }
`;
