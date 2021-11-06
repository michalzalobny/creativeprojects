import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface Props {
  fullWidth: boolean;
}

export const Wrapper = styled(motion.button)<Props>`
  display: inline-block;
  cursor: pointer;

  ${props =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
`;

Wrapper.defaultProps = {
  variants: {
    initial: {},
    animate: {},
  },
};
