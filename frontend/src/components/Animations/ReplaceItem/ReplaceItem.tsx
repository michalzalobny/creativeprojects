import React from 'react';

import { Wrapper } from './styled/Wrapper';
import { ContentWrapper } from './styled/ContentWrapper';
import { FloatItemWrapper } from './styled/FloatItemWrapper';
import { DefaultItemWrapper } from './styled/DefaultItemWrapper';

export interface ReplaceItemProps {
  children: React.ReactNode;
  replaceColor?: string;
  defaultColor?: string;
  isBackground?: boolean;
  fullSpace?: boolean;
}

export const ReplaceItem = (props: ReplaceItemProps) => {
  const {
    fullSpace,
    isBackground = false,
    defaultColor = '',
    replaceColor,
    children,
    ...rest
  } = props;
  return (
    <>
      <Wrapper fullSpace={fullSpace} {...rest}>
        <ContentWrapper fullSpace={fullSpace}>
          <FloatItemWrapper
            fullSpace={fullSpace}
            isBackground={isBackground}
            replaceColor={replaceColor}
          >
            {children}
          </FloatItemWrapper>
          <DefaultItemWrapper
            fullSpace={fullSpace}
            isBackground={isBackground}
            defaultColor={defaultColor}
          >
            {children}
          </DefaultItemWrapper>
        </ContentWrapper>
      </Wrapper>
    </>
  );
};
