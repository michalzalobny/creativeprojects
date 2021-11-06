import styled from 'styled-components';
import { motion } from 'framer-motion';

import { ArrowBtn } from 'components/ArrowBtn/ArrowBtn';

interface Props {}

export const BackButton = styled(ArrowBtn)<Props>`
  position: absolute;
  top: 0;
  left: 0;
`;
