import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {
  secondaryItem?: boolean;
}

export const ForkWrapper = styled(motion.div)<Props>`
  position: absolute;
  left: 0;
  z-index: 0;
  top: 50%;
  transform: translate(-80%, -60%);

  ${props =>
    props.secondaryItem &&
    css`
      transform: translate(-80%, -65%);
    `}

  ${media.tablet} {
    transform: translate(-40%, -60%);

    ${props =>
      props.secondaryItem &&
      css`
        transform: translate(-40%, -65%);
      `}
  }
`;
