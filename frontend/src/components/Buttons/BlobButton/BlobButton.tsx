import React, { forwardRef, memo } from 'react';
import { motion, Variants, Transition } from 'framer-motion';

import { Wrapper } from './styled/Wrapper';

interface BlobButtonProps {
  variants?: Variants;
  transition?: Transition;
  renderAs?: 'a' | 'button';
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  target?: '_blank';
}

export const BlobButton = memo(
  forwardRef((props: BlobButtonProps, ref: React.Ref<HTMLAnchorElement>) => {
    const { renderAs = 'button', children, ...rest } = props;
    return (
      <Wrapper ref={ref} as={motion[renderAs]} {...rest}>
        {children}
      </Wrapper>
    );
  }),
);

BlobButton.displayName = 'BlobButton';

// Add passHref flag to Link from next/Link (if using a):
//<Link href="/panel" passHref>
//  <MyDefaultButton renderAs="a">panel</MyDefaultButton>
//</Link>
