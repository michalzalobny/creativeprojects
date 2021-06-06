import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import { springElastic } from 'components/Animations/framerTransitions';

interface Props {
  absolute?: boolean;
}

export const TextWrapper = styled(motion.div)<Props>`
  font-size: inherit;
  font-weight: inherit;
  display: flex;
  width: 100%;

  ${props =>
    props.absolute &&
    css`
      position: absolute;
      top: 0;
      left: 0;
    `}
`;

TextWrapper.defaultProps = {
  variants: {
    initial: {},
    animate: {},
    exit: {},
  },
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
  transition: {
    ...springElastic,
  },
};
