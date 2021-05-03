import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const BackgroundWrapper = styled(motion.div)<Props>`
  width: 100%;
  height: 100%;
  border-radius: 100px;
  position: absolute;
  left: 0;
  top: 0;
`;
