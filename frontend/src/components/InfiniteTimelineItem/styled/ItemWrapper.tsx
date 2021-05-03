import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const ItemWrapper = styled(motion.div)<Props>`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  position: relative;
  background-color: #fff7e7;
  border: 1px solid #ab61ff;

  ${media.tablet} {
    height: 100vh;
    width: 90vw;
    background-color: #fff7e7;
    border: 1px solid #ab61ff;
    justify-content: center;
    flex-direction: row;
  }
`;
