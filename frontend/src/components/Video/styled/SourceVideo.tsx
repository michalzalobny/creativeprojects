import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const SourceVideo = styled(motion.video)<Props>`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
