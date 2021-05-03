import React, { memo, forwardRef } from 'react';
import { compiler } from 'markdown-to-jsx';
import { motion, Variants, Transition } from 'framer-motion';

import { Wrapper } from './styled/Wrapper';

type RenderAsType = keyof JSX.IntrinsicElements;

export interface RichTextProps {
  text: string;
  variants?: Variants;
  transition?: Transition;
  renderAs?: RenderAsType;
}

export const RichText = memo(
  forwardRef((props: RichTextProps, ref: React.Ref<HTMLElement>) => {
    const { text, renderAs = 'div', ...rest } = props;

    return (
      <Wrapper as={motion[renderAs]} ref={ref} {...rest}>
        {compiler(text, { wrapper: null })}
      </Wrapper>
    );
  }),
);

RichText.displayName = 'RichText';
