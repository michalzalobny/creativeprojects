import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const ImagePlaceholder = styled(motion.div)<Props>`
  width: 100%;
  display: block;
  padding-top: 56.25%;
  background: pink;
`;
