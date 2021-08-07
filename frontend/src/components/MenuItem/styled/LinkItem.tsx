import styled from 'styled-components';
import { motion } from 'framer-motion';

import { sharedValues } from 'utils/sharedValues';
import { media, computeValue } from 'utils/responsive';

interface Props {}

export const LinkItem = styled(motion.a)<Props>`
  font-family: 'Playfair';
  color: ${sharedValues.colors.trueWhite};
  ${sharedValues.fontPresets.normal};
  white-space: nowrap;
  font-size: 5vw;
  display: block;
  position: relative;

  ${media.tablet} {
    font-size: ${computeValue({
      pixelValue: 30,
      referenceWidth: sharedValues.containers.normal.referenceWidth,
    })};
  }

  ${media.custom(sharedValues.containers.normal.breakpoint)} {
    font-size: 30px;
  }
`;
