import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { media } from 'utils/responsive';

interface Props {
  groupNumber: number;
}

export const GalleryItem = styled(motion.figure)<Props>`
  width: 100%;
  position: relative;
  transform: scale(1);
  height: 60vw;

  ${props =>
    props.groupNumber &&
    css`
      transform: ${`translateY(-${props.groupNumber * 20}vw)`};
    `}

  ${media.tablet} {
    height: 22vw;
  }
`;
