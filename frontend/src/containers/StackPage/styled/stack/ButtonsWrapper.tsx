import styled from 'styled-components';
import { motion } from 'framer-motion';

import { sharedValues } from 'utils/sharedValues';
import { media, computeValue } from 'utils/responsive';

interface Props {}

export const ButtonsWrapper = styled(motion.div)<Props>`
  display: flex;
  position: relative;
  z-index: 1;
  margin: 5vw 0;
  margin-bottom: 20vw;

  ${media.tablet} {
    margin-bottom: ${computeValue({
      pixelValue: 80,
      referenceWidth: sharedValues.containers.normal.referenceWidth,
    })};

    margin: ${computeValue({
        pixelValue: 50,
        referenceWidth: sharedValues.containers.normal.referenceWidth,
      })}
      0;
  }

  ${media.custom(sharedValues.containers.normal.breakpoint)} {
    margin: 50px 0;
    margin-bottom: 100px;
  }
`;
