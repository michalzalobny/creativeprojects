import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Wrapper = styled(motion.button)<Props>`
  display: inline-block;
  cursor: pointer;
`;

Wrapper.defaultProps = {
  variants: {
    initial: {},
    animate: {},
  },
};
