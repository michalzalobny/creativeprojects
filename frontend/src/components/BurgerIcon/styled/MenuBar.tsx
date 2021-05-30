import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import { springMod } from 'components/Animations/framerTransitions';

interface Props {
  top?: boolean;
  middle?: boolean;
  bottom?: boolean;
  barColor: string;
}

export const MenuBar = styled(motion.span)<Props>`
  position: absolute;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: ${props => props.barColor};
  transform-origin: center;
  transition: background-color 0.5s;

  ${props =>
    props.top &&
    css`
      top: 0;
    `}

  ${props =>
    props.middle &&
    css`
      transform: translateY(-50%) translateX(15%);
      top: 50%;
      transform-origin: right;
    `}

    ${props =>
      props.bottom &&
      css`
        bottom: 0;
      `}
`;

MenuBar.defaultProps = {
  transition: {
    ...springMod,
  },
};
