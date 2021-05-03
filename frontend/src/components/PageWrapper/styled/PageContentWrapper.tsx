import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const PageContentWrapper = styled(motion.div)<Props>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
`;

PageContentWrapper.defaultProps = {
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
};
