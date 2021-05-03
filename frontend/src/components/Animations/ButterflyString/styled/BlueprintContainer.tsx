import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const BlueprintContainer = styled(motion.div)<Props>`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
`;
