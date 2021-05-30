import styled from 'styled-components';
import { motion } from 'framer-motion';

import { sharedValues } from 'utils/sharedValues';

interface Props {}

export const CircleBackground = styled(motion.div)<Props>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${sharedValues.colors.trueBlack};
`;
