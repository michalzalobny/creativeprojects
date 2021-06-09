import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Text = styled(motion.div)<Props>`
  font-size: 5vw;
  color: white;
  font-family: 'Playfair';
  position: relative;
`;
