import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';
interface Props {
  translation: number;
  spacingMobile: number;
  spacingTablet: number;
}

export const GalleryGroup = styled(motion.div)<Props>`
  display: flex;
  flex-direction: column;
  width: 100%;
  transform: ${props =>
    props.translation && `translateY(${-props.translation}vw)`};

  padding-left: ${props => props.spacingMobile / 2}vw;
  padding-right: ${props => props.spacingMobile / 2}vw;

  ${media.tablet} {
    padding-left: ${props => props.spacingTablet / 2}vw;
    padding-right: ${props => props.spacingTablet / 2}vw;
  }
`;
