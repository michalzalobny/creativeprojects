import styled from 'styled-components';
import { motion } from 'framer-motion';

import { sharedValues } from 'utils/sharedValues';

interface Props {}

export const ErrorCode = styled(motion.p)<Props>`
  letter-spacing: 1px;
`;
