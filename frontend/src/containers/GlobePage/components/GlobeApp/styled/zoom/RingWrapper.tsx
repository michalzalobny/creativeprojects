import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const RingWrapper = styled(motion.div)<Props>`
  width: 90px;
  height: 90px;
  position: relative;
`;
