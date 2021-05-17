import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Wrapper = styled(motion.div)<Props>`
  position: fixed;
  bottom: 15px;
  right: 15px;
  background-color: #eeeeee;
  box-shadow: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 12px;
  z-index: 5;
  display: flex;
  flex-direction: column;
`;
