import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springSlow, stagger } from 'components/Animations/framerTransitions';

interface Props {}

export const LinksWrapper = styled(motion.div)<Props>`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 100%;
  overflow: hidden;
`;

LinksWrapper.defaultProps = {
  variants: {
    initial: {},
    animate: {},
  },

  transition: {
    staggerChildren: stagger.menuItems,
    ...springSlow,
  },
};
