import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const InfoWrapper = styled(motion.div)<Props>`
  mix-blend-mode: difference;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;
