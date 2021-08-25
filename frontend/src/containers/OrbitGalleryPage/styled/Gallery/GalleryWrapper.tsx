import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const GalleryWrapper = styled(motion.div)<Props>`
  position: absolute;
  top: 0;
  left: 50%;
  width: 350%;
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  opacity: 0.1;

  ${media.tablet} {
    width: 150%;
  }
`;
