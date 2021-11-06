import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import { springMedium } from 'components/Animations/framerTransitions';

interface Props {
  replaceColor?: string;
  isBackground: boolean;
  fullSpace?: boolean;
}

export const FloatItemWrapper = styled(motion.span)<Props>`
  display: block;
  position: absolute;
  top: 0;
  left: 0;

  ${props =>
    props.fullSpace &&
    css`
      width: 100%;
      height: 100%;
    `}

  ${props =>
    props.replaceColor &&
    css`
      color: ${props.replaceColor};
      fill: ${props.replaceColor};
      ${props.isBackground &&
      css`
        background: ${props.replaceColor};
      `}
    `}
`;

FloatItemWrapper.defaultProps = {
  variants: {
    initial: {
      y: '-105%',
    },
    animate: {
      y: '0%',
      transition: {
        ...springMedium,
        delay: 0.05,
      },
    },
  },

  transition: {
    ...springMedium,
  },
};
