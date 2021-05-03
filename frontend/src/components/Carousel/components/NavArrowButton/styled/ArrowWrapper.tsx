import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface Props {
  inverse: boolean;
}

export const ArrowWrapper = styled(motion.div)<Props>`
  width: 100%;
  height: 100%;
  ${props =>
    props.inverse &&
    css`
      transform: rotate(180deg);
    `}
`;
