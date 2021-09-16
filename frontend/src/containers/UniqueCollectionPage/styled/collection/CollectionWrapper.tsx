import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const CollectionWrapper = styled(motion.div)<Props>`
  height: 100%;
  display: flex;
  align-items: center;
`;
