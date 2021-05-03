import styled from 'styled-components';
import { motion } from 'framer-motion';

import cloudSrc from '../images/cloud.svg';

interface Props {
  size: number;
  posX: number;
  posY: number;
}

export const CloudImage = styled(motion.img)<Props>`
  width: ${props => props.size}px;
  position: absolute;
  left: ${props => props.posX}px;
  top: ${props => props.posY}px;
`;

CloudImage.defaultProps = {
  src: cloudSrc.src,
};
