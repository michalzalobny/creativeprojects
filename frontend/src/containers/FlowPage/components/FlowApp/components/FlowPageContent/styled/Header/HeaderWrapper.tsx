import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const HeaderWrapper = styled(motion.div)<Props>`
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
