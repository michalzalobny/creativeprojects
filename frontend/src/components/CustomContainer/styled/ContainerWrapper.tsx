import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';
import { ContainerValuesType } from 'components/CustomContainer/utils/customContainers';

type ContainerWrapperProps = {
  containerValues: ContainerValuesType;
};

export const ContainerWrapper = styled(motion.div)<ContainerWrapperProps>`
  padding: 0 ${props => props.containerValues.mobilePadding}px;

  ${media.tablet} {
    padding: 0 ${props => props.containerValues.negativeSpaceResponsive}vw;
  }

  ${props => css`
    ${media.custom(props.containerValues.breakpoint)} {
      padding: 0 ${props.containerValues.negativeSpace}px;
    }
  `}
`;
