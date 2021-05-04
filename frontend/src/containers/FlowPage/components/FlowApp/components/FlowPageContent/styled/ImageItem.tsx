import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const ImageItem = styled(motion.div)<Props>`
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: 100px;
  }
`;
