import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const SliderItem = styled(motion.div)<Props>`
  width: 12vw;
  background: #5c5c5c;
  position: relative;

  &:before {
    content: '';
    display: block;
    width: 100%;
    padding-bottom: 155%;
  }
`;
