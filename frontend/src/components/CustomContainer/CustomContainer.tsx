import React from 'react';

import {
  getContainerValues,
  ContainerSettingsType,
} from 'components/CustomContainer/utils/customContainers';

import { Container } from './styled/Container';
import { ContainerWrapper } from './styled/ContainerWrapper';
import { CoverWrapper } from './styled/CoverWrapper';

interface CustomContainerProps {
  children?: React.ReactNode;
  containerSettings: ContainerSettingsType;
}

export const CustomContainer = React.memo<CustomContainerProps>(props => {
  const { children, containerSettings } = props;
  const containerValues = getContainerValues(containerSettings);

  return (
    <>
      <CoverWrapper>
        <ContainerWrapper containerValues={containerValues}>
          <Container maxWidth={containerSettings.maxWidth}>
            {children}
          </Container>
        </ContainerWrapper>
      </CoverWrapper>
    </>
  );
});

CustomContainer.displayName = 'CustomContainer';
