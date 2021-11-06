import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import { springMedium } from 'components/Animations/framerTransitions';

interface Props {
  defaultColor: string;
  isBackground: boolean;
  fullSpace?: boolean;
}

export const DefaultItemWrapper = styled(motion.span)<Props>`
  display: block;
  position: relative;

  ${props =>
    props.fullSpace &&
    css`
      width: 100%;
      height: 100%;
    `}

  ${props =>
    props.defaultColor &&
    css`
      color: ${props.defaultColor};
      fill: ${props.defaultColor};
      ${props.isBackground &&
      css`
        background: ${props.defaultColor};
      `}
    `}
`;

DefaultItemWrapper.defaultProps = {
  variants: {
    initial: {
      y: '0%',
      transition: {
        ...springMedium,
        delay: 0.05,
      },
    },
    animate: {
      y: '105%',
    },
  },

  transition: {
    ...springMedium,
  },
};
