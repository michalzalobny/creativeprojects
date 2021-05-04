import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const FlowPageContentWrapper = styled(motion.div)<Props>`
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
`;
