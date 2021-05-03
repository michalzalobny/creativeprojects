import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {
  size: number;
}

export const Ball = styled(motion.div)<Props>`
  z-index: 2;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  background-color: #f3f3f3;
  border-radius: 50%;
  overflow: hidden;
  //Fix ios issues with border-radius
  mask-image: -webkit-radial-gradient(white, black);
`;

Ball.defaultProps = {
  transition: {
    type: 'spring',
    stiffness: 250,
    mass: 4,
    damping: 50,
  },
};
