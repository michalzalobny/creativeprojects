import React, { memo, useRef, useState } from 'react';
import Link from 'next/link';

import { LinkItem } from './styled/LinkItem';
import { Wrapper } from './styled/Wrapper';
import { LinkWrapper } from './styled/LinkWrapper';
import { ImageContainer } from './styled/ImageContainer';
import { Parallax } from 'components/Animations/Parallax/Parallax';
import { ImageWrapper } from './styled/ImageWrapper';
import { Image } from './styled/Image';
import { Underline } from './styled/Underline';

export type MenuItem = {
  label: string;
  href: string;
};

export interface MenuItemProps {
  itemContent: MenuItem;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuItem = memo<MenuItemProps>(props => {
  const { setShowMenu, itemContent, ...rest } = props;
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Wrapper
        style={{ zIndex: isHovered ? 2 : 1 }}
        ref={wrapperRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...rest}
      >
        <LinkWrapper
          onClick={() => {
            setShowMenu(false);
            setIsHovered(false);
          }}
          animate={isHovered ? 'animate' : 'initial'}
        >
          <Link href={itemContent.href} passHref>
            <LinkItem>
              {itemContent.label}
              <Underline />
            </LinkItem>
          </Link>
        </LinkWrapper>

        <ImageContainer animate={isHovered ? 'animate' : 'initial'}>
          <Parallax refElement={wrapperRef} shouldResetPosition>
            <ImageWrapper>
              <Image
                animate={isHovered ? 'animate' : 'initial'}
                src={
                  'https://images.unsplash.com/photo-1496096265110-f83ad7f96608?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
                }
              />
            </ImageWrapper>
          </Parallax>
        </ImageContainer>
      </Wrapper>
    </>
  );
});

MenuItem.displayName = 'MenuItem';
