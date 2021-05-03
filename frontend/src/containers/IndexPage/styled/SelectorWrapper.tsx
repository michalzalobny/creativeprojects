import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const SelectorWrapper = styled(motion.div)<Props>`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 50px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 5rem rgba(0, 0, 0, 0.1);
  margin: 50px 0;
`;
