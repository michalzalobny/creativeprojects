import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';
import { sharedValues } from 'utils/sharedValues';

interface Props {
  secondaryItem?: boolean;
}

export const KnifeWrapper = styled(motion.div)<Props>`
  position: absolute;
  right: 0;
  z-index: 1;

  top: 40%;
  transform: translate(60%, -50%);

  ${props =>
    props.secondaryItem &&
    css`
      transform: translate(60%, -45%);
    `}

  ${media.tablet} {
    top: 30%;
    transform: translate(40%, -50%);

    ${props =>
      props.secondaryItem &&
      css`
        transform: translate(35%, -55%);
      `}
  }

  ${media.custom(sharedValues.containers.normal.breakpoint)} {
    top: 20%;
    transform: translate(40%, -50%);

    ${props =>
      props.secondaryItem &&
      css`
        transform: translate(35%, -55%);
      `}
  }
`;
