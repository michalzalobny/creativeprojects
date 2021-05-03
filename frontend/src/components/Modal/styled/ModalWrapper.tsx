import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const ModalWrapper = styled(motion.div)<Props>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 40;
`;

ModalWrapper.defaultProps = {
  variants: {
    initial: {},
    animate: {},
    exit: {},
  },
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
};
