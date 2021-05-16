import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {
  width100?: boolean;
}

export const WordsWrapper = styled(motion.div)<Props>`
  display: flex;
  width: 90%;

  ${media.tablet} {
    width: 53%;
  }

  ${props =>
    props.width100 &&
    css`
      justify-content: center;
      width: 100%;
    `}
`;
