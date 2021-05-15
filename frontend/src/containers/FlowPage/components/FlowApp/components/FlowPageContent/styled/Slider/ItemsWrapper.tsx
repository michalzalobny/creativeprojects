import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const ItemsWrapper = styled(motion.div)<Props>`
  display: flex;
  align-items: center;
`;
