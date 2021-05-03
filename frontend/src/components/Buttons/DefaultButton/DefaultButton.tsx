import React, { forwardRef, memo } from 'react';
import { motion, Variants, Transition } from 'framer-motion';

import { Wrapper } from './styled/Wrapper';

interface DefaultButtonProps {
  variants?: Variants;
  transition?: Transition;
  renderAs?: 'a' | 'button';
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  target?: '_blank';
}

export const DefaultButton = memo(
  forwardRef((props: DefaultButtonProps, ref: React.Ref<HTMLAnchorElement>) => {
    const { renderAs = 'button', children, ...rest } = props;
    return (
      <Wrapper ref={ref} as={motion[renderAs]} {...rest}>
        {children}
      </Wrapper>
    );
  }),
);

DefaultButton.displayName = 'DefaultButton';

// Add passHref flag to Link from next/Link (if using a):
//<Link href="/panel" passHref>
//  <MyDefaultButton renderAs="a">panel</MyDefaultButton>
//</Link>
