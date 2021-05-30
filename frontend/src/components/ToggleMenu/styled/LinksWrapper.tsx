import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springSlow, stagger } from 'components/Animations/framerTransitions';

interface Props {
  offsetPadding: number;
}

export const LinksWrapper = styled(motion.div)<Props>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  overflow: hidden;
  padding: ${props => props.offsetPadding}px;
`;

LinksWrapper.defaultProps = {
  variants: {
    initial: {
      transition: {
        delayChildren: stagger.menuItems,
      },
    },
    animate: {},
  },

  transition: {
    staggerChildren: stagger.menuItems,
    ...springSlow,
  },
};
