import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Wrapper = styled(motion.div)<Props>`
  position: relative;

  & > * {
    margin: revert;
    padding: revert;
    text-decoration: revert;
    border: revert;
  }

  & > * {
    &:first-child {
      margin-top: 0;
      padding-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
    }
  }
`;
