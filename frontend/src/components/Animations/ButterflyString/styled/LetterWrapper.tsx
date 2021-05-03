import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

interface Props {
  isSpace: boolean;
}

export const LetterWrapper = styled(motion.span)<Props>`
  display: inline-block;
  padding: 0 0.1em;
  margin: 0 -0.1em;
  transform-origin: center center 0.4em;

  ${props =>
    props.isSpace &&
    css`
      width: 0.4em;
    `}
`;
