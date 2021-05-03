import styled from 'styled-components';
import { motion } from 'framer-motion';

import { sharedValues } from 'utils/sharedValues';

interface Props {}

export const Wrapper = styled(motion.p)<Props>`
  position: relative;
  & > * {
    margin: revert;
    padding: revert;
    text-decoration: revert;
    border: revert;
  }
`;
