import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface Props {
  isVisible: boolean;
}

export const Wrapper = styled(motion.div)<Props>`
  ${props =>
    !props.isVisible &&
    css`
      pointer-events: none;
    `}
`;
