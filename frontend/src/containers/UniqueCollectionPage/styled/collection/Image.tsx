import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Image = styled(motion.img)<Props>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
`;
