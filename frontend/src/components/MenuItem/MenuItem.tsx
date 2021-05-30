import React, { memo, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { LinkItem } from './styled/LinkItem';
import { Wrapper } from './styled/Wrapper';
import { LinkWrapper } from './styled/LinkWrapper';
import { ImageContainer } from './styled/ImageContainer';
import { Parallax } from 'components/Animations/Parallax/Parallax';
import { ImageWrapper } from './styled/ImageWrapper';
import { Image } from './styled/Image';
import { Underline } from './styled/Underline';
import { useRouter } from 'next/router';

export type MenuItem = {
  label: string;
  href: string;
  imageSrc: string;
};

export interface MenuItemProps {
  itemContent: MenuItem;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuItem = memo<MenuItemProps>(props => {
  const { setShowMenu, itemContent, ...rest } = props;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const refEl = wrapperRef.current;

    const onTouch = () => {
      router.push(itemContent.href);
      setShowMenu(false);
      setIsHovered(false);
    };

    const onClick = () => {
      router.push(itemContent.href);
      setShowMenu(false);
      setIsHovered(false);
    };

    refEl.addEventListener('touchend', onTouch);
    refEl.addEventListener('click', onClick);

    return () => {
      refEl.removeEventListener('touchend', onTouch);
      refEl.removeEventListener('click', onClick);
    };
  });

  return (
    <>
      <Wrapper
        style={{ zIndex: isHovered ? 2 : 1 }}
        ref={wrapperRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...rest}
      >
        <LinkWrapper animate={isHovered ? 'animate' : 'initial'}>
          <LinkItem>
            {itemContent.label}
            <Underline />
          </LinkItem>
        </LinkWrapper>

        <ImageContainer animate={isHovered ? 'animate' : 'initial'}>
          <Parallax refElement={wrapperRef} shouldResetPosition>
            <ImageWrapper>
              <Image
                animate={isHovered ? 'animate' : 'initial'}
                src={itemContent.imageSrc}
              />
            </ImageWrapper>
          </Parallax>
        </ImageContainer>
      </Wrapper>
    </>
  );
});

MenuItem.displayName = 'MenuItem';
