import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const ItemsContainer = styled(motion.div)<Props>`
  position: relative;
  transition: height 0.5s;
`;
