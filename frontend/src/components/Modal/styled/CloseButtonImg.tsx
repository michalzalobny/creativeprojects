import styled from 'styled-components';
import { motion } from 'framer-motion';

import closeButtonSrc from '../images/closeicon.svg';

interface Props {}

export const CloseButtonImg = styled(motion.img)<Props>`
  width: 100%;
  height: 100%;
`;

CloseButtonImg.defaultProps = {
  src: closeButtonSrc.src,
};
