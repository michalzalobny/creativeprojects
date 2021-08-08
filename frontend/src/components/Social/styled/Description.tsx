import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springQuick } from 'components/Animations/framerTransitions';

interface Props {}

export const Description = styled(motion.div)<Props>`
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #e4e4e4;
  font-weight: 800;
  background: #2c2c2c;
  padding: 8px 20px;
  border-radius: 10px;
  white-space: nowrap;
  user-select: none;

  &:before {
    content: '';
    width: 12px;
    height: 12px;
    background-color: #2c2c2c;
    position: absolute;
    left: 50%;
    transform: translateX(-50%) translateY(-55%) rotate(45deg);
    top: 100%;
    border-radius: 3px;
  }
`;

Description.defaultProps = {
  variants: {
    initial: {
      opacity: 0,
      y: '30%',
      x: '-50%',
    },
    animate: {
      opacity: 1,
      y: '0%',
      x: '-50%',
    },
  },
  initial: 'initial',

  transition: {
    ...springQuick,
  },
};
