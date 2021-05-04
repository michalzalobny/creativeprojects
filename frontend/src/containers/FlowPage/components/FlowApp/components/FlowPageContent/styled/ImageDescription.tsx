import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const ImageDescription = styled(motion.p)<Props>`
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 3px;
  padding: 15px 0;
`;
