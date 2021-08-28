import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Image = styled(motion.img)<Props>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
