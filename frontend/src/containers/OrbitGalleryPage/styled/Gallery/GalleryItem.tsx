import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const GalleryItem = styled(motion.figure)<Props>`
  background-color: red;
  width: 100%;
  height: 45vw;
  position: relative;
  transform: scale(0.9);

  /* &:nth-child(2) {
    margin-top:30px;
  } */

  /* &:nth-child(2) {
    height: 50px;
  }

  &:nth-child(3) {
    height: 120px;
  }

  &:nth-child(4) {
    height: 70px;
  }

  &:nth-child(5) {
    height: 60px;
  }
  &:nth-child(6) {
    height: 40px;
  } */
`;
