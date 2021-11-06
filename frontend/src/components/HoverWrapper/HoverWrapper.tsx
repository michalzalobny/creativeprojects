import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import { useHover } from 'hooks/useHover';

import { Wrapper } from './styled/Wrapper';
import { AnimationWrapper } from './styled/AnimationWrapper';

export interface HoverWrapperProps {
  fullWidth?: boolean;
  children: React.ReactNode;
  myHref?: string;
  target?: string;
  onClick?: (e: React.MouseEvent) => void;
  isAnimated?: boolean;
  dontUseHover?: boolean; //Dont use hover functionality just animate when the prop is true
}

export const HoverWrapper = (props: HoverWrapperProps) => {
  const {
    fullWidth = false,
    dontUseHover,
    isAnimated,
    target,
    children,
    myHref = null,
    ...rest
  } = props;

  const elRef = useRef(null);

  const { isHovered } = useHover(elRef);

  return (
    <>
      {myHref ? (
        <Link passHref href={myHref}>
          <Wrapper
            fullWidth={fullWidth}
            target={target}
            as={motion.a}
            {...rest}
            ref={elRef}
          >
            <AnimatePresence exitBeforeEnter={false}>
              <AnimationWrapper
                initial="initial"
                animate={
                  dontUseHover
                    ? isAnimated
                      ? 'animate'
                      : 'initial'
                    : isHovered
                    ? 'animate'
                    : 'initial'
                }
              >
                {children}
              </AnimationWrapper>
            </AnimatePresence>
          </Wrapper>
        </Link>
      ) : (
        <Wrapper
          fullWidth={fullWidth}
          as={myHref === null ? motion.button : motion.span}
          {...rest}
          ref={elRef}
        >
          <AnimatePresence exitBeforeEnter={false}>
            <AnimationWrapper
              initial="initial"
              animate={
                dontUseHover
                  ? isAnimated
                    ? 'animate'
                    : 'initial'
                  : isHovered
                  ? 'animate'
                  : 'initial'
              }
            >
              {children}
            </AnimationWrapper>
          </AnimatePresence>
        </Wrapper>
      )}
    </>
  );
};
