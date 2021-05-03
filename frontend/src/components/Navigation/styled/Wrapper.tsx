import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Wrapper = styled(motion.div)<Props>`
  position: fixed;
  top: 4rem;
  right: 4rem;
  background-color: #eeeeee;
  box-shadow: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 30px;
  z-index: 10;
  display: flex;
  font-size: 15px;
  flex-direction: column;
  color: black;
`;
