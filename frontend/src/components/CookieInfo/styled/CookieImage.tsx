import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springQuick } from 'components/Animations/framerTransitions';

import cookiesImageSrc from '../images/cookiesImage.svg';

export const CookieImage = styled(motion.img)`
  width: 15rem;
  position: absolute;
  bottom: 85%;
  left: 0;
`;

CookieImage.defaultProps = {
  src: cookiesImageSrc.src,
  variants: {
    initial: {
      x: '100%',
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
  },
  transition: {
    ...springQuick,
  },
};
