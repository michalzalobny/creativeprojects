import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {
  isPanning: boolean;
}

const SPACING = 8;
const SIZE = 1.5;

export const TextWrapper = styled(motion.div)<Props>`
  position: relative;
  padding-right: ${SPACING}vh;

  &:before {
    content: '';
    position: absolute;
    right: ${SPACING / 2 - SIZE / 2}vh;
    top: 50%;
    width: ${SIZE}vh;
    height: ${SIZE}vh;
    transform: translateY(20%) scale(1);
    background: #ffffff;
    border-radius: 50%;
    transition: all 0.45s;
    transition-delay: 0.6s;

    ${props =>
      props.isPanning &&
      css`
        transform: translateY(20%) scale(0);
        transition-delay: 0s;
      `}
  }

  ${media.tablet} {
    &:before {
      transform: translateY(-80%) scale(1);

      ${props =>
        props.isPanning &&
        css`
          transform: translateY(-80%) scale(0);
        `}
    }
  }
`;
