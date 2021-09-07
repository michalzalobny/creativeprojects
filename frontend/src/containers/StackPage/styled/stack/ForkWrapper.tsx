import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';
import { sharedValues } from 'utils/sharedValues';

interface Props {
  secondaryItem?: boolean;
}

export const ForkWrapper = styled(motion.div)<Props>`
  position: absolute;
  left: 0;
  z-index: 1;

  top: 40%;
  transform: translate(-60%, -50%);

  ${props =>
    props.secondaryItem &&
    css`
      transform: translate(-60%, -45%);
    `}

  ${media.tablet} {
    top: 22%;
    transform: translate(-45%, -30%);

    ${props =>
      props.secondaryItem &&
      css`
        transform: translate(-40%, -30%);
      `}
  }

  ${media.custom(sharedValues.containers.normal.breakpoint)} {
    top: 20%;
    transform: translate(-40%, -30%);

    ${props =>
      props.secondaryItem &&
      css`
        transform: translate(-35%, -30%);
      `}
  }
`;
