import styled from 'styled-components';
import { motion } from 'framer-motion';
import { media } from 'utils/responsive';

interface Props {
  spacingMobile: number;
  spacingTablet: number;
}

export const GalleryItem = styled(motion.figure)<Props>`
  width: 100%;
  position: relative;
  transform: scale(1);
  height: 60vw;
  margin-top: ${props => props.spacingMobile}vw;

  ${media.tablet} {
    height: 22vw;
    margin-top: ${props => props.spacingTablet}vw;
  }
`;
