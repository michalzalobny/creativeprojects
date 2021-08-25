import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {
  translation: number;
}

export const GalleryGroup = styled(motion.div)<Props>`
  display: flex;
  flex-direction: column;
  width: 100%;

  transform: ${props =>
    props.translation && `translateY(${-props.translation}vw)`};

  padding: 0 3vw;
`;
