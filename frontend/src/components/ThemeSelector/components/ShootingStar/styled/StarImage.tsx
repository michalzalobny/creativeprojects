import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {
  size: number;
  height: number;
}

export const StarImage = styled(motion.div)<Props>`
  width: ${props => props.size}px;
  height: ${props => props.height}px;
  background-color: #fff;
  border-radius: 150px;
  transform-origin: right;
`;

StarImage.defaultProps = {
  variants: {
    initial: {
      scaleX: 0,
      opacity: 1,
    },
    animate: {
      scaleX: 1,
      opacity: 0,
    },
  },
  animate: 'animate',
};
