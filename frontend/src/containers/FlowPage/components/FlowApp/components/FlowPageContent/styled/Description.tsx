import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Description = styled(motion.p)<Props>`
  font-size: 15px;
  line-height: 25px;
  text-align: justify;
`;
