import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springMedium } from 'components/Animations/framerTransitions';

interface Props {}

export const Wrapper = styled(motion.div)<Props>`
  width: 100%;
  height: 100%;
  position: relative;
`;

Wrapper.defaultProps = {
  initial: 'initial',
  transition: {
    ...springMedium,
  },
};
