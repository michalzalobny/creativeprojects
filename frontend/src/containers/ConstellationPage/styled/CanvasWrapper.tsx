import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props { }

export const CanvasWrapper = styled.div<Props>`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
`;
