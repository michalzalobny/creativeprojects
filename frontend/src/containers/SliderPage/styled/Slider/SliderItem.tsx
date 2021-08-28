import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const SliderItem = styled(motion.div)<Props>`
  width: 15vw;
  background: red;

  &:before {
    content: '';
    display: block;
    width: 100%;
    padding-bottom: 155%;
  }
`;
