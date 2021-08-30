import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const SliderItem = styled(motion.div)<Props>`
  width: 5vw;
  background: #dbdbdb;
  position: relative;
  transform: translateX(20vw);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &:before {
    content: '';
    display: block;
    width: 100%;
    padding-bottom: 155%;
  }
`;
