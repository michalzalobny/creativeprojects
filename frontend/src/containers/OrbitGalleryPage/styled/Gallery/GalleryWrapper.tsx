import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {
  columnsCount: number;
}

const MOBILE_GAP = 6;
const TABLET_GAP = 9;

export const GalleryWrapper = styled(motion.div)<Props>`
  position: absolute;
  top: 0;
  left: 50%;
  width: 240%;
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: ${props => `repeat(${props.columnsCount}, 1fr)`};
  opacity: 0.1;

  grid-gap: ${MOBILE_GAP}vw;
  padding: ${MOBILE_GAP / 2}vw;

  ${media.tablet} {
    width: 180%;
    grid-gap: ${TABLET_GAP}vw;
    padding: ${TABLET_GAP / 2}vw;
  }
`;
