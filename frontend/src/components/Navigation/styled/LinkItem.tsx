import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const LinkItem = styled(motion.a)<Props>`
  color: black;
  font-size: 13px;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;
