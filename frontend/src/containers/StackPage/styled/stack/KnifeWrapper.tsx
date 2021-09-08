import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {
  secondaryItem?: boolean;
}

export const KnifeWrapper = styled(motion.div)<Props>`
  position: absolute;
  right: 0;
  z-index: 0;

  top: 50%;
  transform: translate(80%, -90%);

  ${props =>
    props.secondaryItem &&
    css`
      transform: translate(80%, -95%);
    `}

  ${media.tablet} {
    transform: translate(40%, -90%);

    ${props =>
      props.secondaryItem &&
      css`
        transform: translate(40%, -95%);
      `}
  }
`;
