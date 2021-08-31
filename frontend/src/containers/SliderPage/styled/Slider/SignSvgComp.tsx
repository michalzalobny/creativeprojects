import styled from 'styled-components';

import { springVerySlow } from 'components/Animations/framerTransitions';

import { SignSvg } from '../../svg/SignSvg';

interface Props {}

export const SignSvgComp = styled(SignSvg)<Props>`
  height: 6vw;
  user-select: none;
  pointer-events: none;
`;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
(SignSvgComp as unknown).defaultProps = {
  variants: {
    initial: {
      scale: 1,
      opacity: 1,
    },
    animate: {
      scale: 1.5,
      opacity: 0,
    },
  },
  initial: 'initial',

  transition: {
    delay: 1,
    ...springVerySlow,
  },
};
