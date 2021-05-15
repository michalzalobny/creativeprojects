import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const SliderWrapper = styled(motion.div)<Props>`
  position: relative;
  width: 100%;
  display: flex;
`;
