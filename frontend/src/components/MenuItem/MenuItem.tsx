import React, { memo, useRef } from 'react';
import { useRouter } from 'next/router';

import { HoverWrapper } from 'components/HoverWrapper/HoverWrapper';
import { ReplaceItem } from 'components/Animations/ReplaceItem/ReplaceItem';
import { useHover } from 'hooks/useHover';

import { LinkItem } from './styled/LinkItem';
import { Wrapper } from './styled/Wrapper';
import { ImageContainer } from './styled/ImageContainer';
import { Parallax } from 'components/Animations/Parallax/Parallax';
import { ImageWrapper } from './styled/ImageWrapper';
import { Image } from './styled/Image';
import { Underline } from './styled/Underline';

export interface MenuItemProps {
  label: string;
  href: string;
  imageSrc: string;
}

export const MenuItem = memo<MenuItemProps>(props => {
  const { href, imageSrc, label, ...rest } = props;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { isHovered } = useHover(wrapperRef);
  const router = useRouter();

  return (
    <>
      <Wrapper style={{ zIndex: isHovered ? 4 : 2 }} ref={wrapperRef} {...rest}>
        <HoverWrapper fullWidth onClick={() => router.push(href)}>
          <ReplaceItem>
            <LinkItem>{label}</LinkItem>
          </ReplaceItem>

          <Underline />

          <ImageContainer>
            <Parallax refElement={wrapperRef}>
              <ImageWrapper>
                <Image src={imageSrc} />
              </ImageWrapper>
            </Parallax>
          </ImageContainer>
        </HoverWrapper>
      </Wrapper>
    </>
  );
});

MenuItem.displayName = 'MenuItem';
