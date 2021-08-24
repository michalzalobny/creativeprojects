import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const LinkWrapper = styled(motion.a)<Props>`
  display: block;
  padding: 15px;
  font-size: 16px;
  color: black;
`;
