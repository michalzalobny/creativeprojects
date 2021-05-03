import styled from 'styled-components';
import { motion } from 'framer-motion';

import { sharedValues } from 'utils/sharedValues';

export const ButtonWrapper = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
`;

ButtonWrapper.defaultProps = {
  variants: {
    initial: {
      x: '-50%',
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: '-50%',
      opacity: 0,
    },
  },
};
