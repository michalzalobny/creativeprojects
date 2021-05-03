import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';
import { sharedValues } from 'utils/sharedValues';
import { springMedium } from 'components/Animations/framerTransitions';

interface Props {
  maxWidth: number;
  padding: number;
  margin: number;
}

const DESKTOP_MARGIN = 50;

export const ModalContentWrapper = styled(motion.div)<Props>`
  max-width: ${props => props.maxWidth}px;
  margin: ${props => props.margin}px ${props => props.margin}px 0
    ${props => props.margin}px;
  background: purple;
  padding: ${props => props.padding / 1.2}px;
  border-radius: ${sharedValues.borderRadius.normal};
  position: relative;
  overflow: auto;

  ${props => css`
    max-height: calc(100vh - ${props.margin * 2}px);
  `}

  ${props => media.custom(props.maxWidth + props.margin * 2)} {
    margin: ${DESKTOP_MARGIN}px auto ${DESKTOP_MARGIN}px auto;
    max-height: calc(100vh - ${2 * DESKTOP_MARGIN}px);
    padding: ${props => props.padding}px;
  }
`;

ModalContentWrapper.defaultProps = {
  variants: {
    initial: {
      x: '-15%',
    },
    animate: {
      x: 0,
    },
    exit: {
      x: '15%',
    },
  },

  transition: {
    ...springMedium,
  },
};
