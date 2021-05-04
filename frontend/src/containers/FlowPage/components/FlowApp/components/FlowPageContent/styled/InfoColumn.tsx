import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const InfoColumn = styled(motion.div)<Props>`
  width: 25%;
  padding: 30px;
  position: sticky;
  top: 0;
`;
