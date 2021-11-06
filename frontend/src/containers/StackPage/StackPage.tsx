import React, { useEffect, useRef, useMemo, useState } from 'react';
import * as THREE from 'three';

import { Head } from 'utils/seo/Head';
import { Layout } from 'components/Layout/Layout';
import { Parallax } from 'components/Animations/Parallax/Parallax';
import { SlideItemWithKey } from 'components/Animations/SlideItemWithKey/SlideItemWithKey';

import { CanvasWrapper } from './styled/CanvasWrapper';
import { Wrapper } from './styled/Wrapper';
import { App } from './classes/App';
import { PageProps } from './data';
import { Text } from './styled/stack/Text';
import { ContentWrapper } from './styled/stack/ContentWrapper';
import { ImageWrapper } from './styled/stack/ImageWrapper';
import { Image } from './styled/stack/Image';
import { KnifeSvgComp } from './styled/stack/KnifeSvgComp';
import { KnifeWrapper } from './styled/stack/KnifeWrapper';
import { ForkSvgComp } from './styled/stack/ForkSvgComp';
import { ForkWrapper } from './styled/stack/ForkWrapper';
import { Button } from './styled/stack/Button';
import { ButtonContainer } from './styled/stack/ButtonContainer';
import { ButtonsWrapper } from './styled/stack/ButtonsWrapper';
import { Border } from './styled/stack/Border';
import { CardItemProps } from './classes/types';

export default function StackPage(props: PageProps) {
  const rendererWrapperEl = useRef<HTMLDivElement>(null);
  const myApp = useRef<App | null>(null);

  const [itemName, setItemName] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const imagesToPreload = useMemo(
    () => props.projectData.creativeItems.map(item => item.image.url),
    [props.projectData.creativeItems],
  );

  const onItemChange = (e: THREE.Event) => {
    const el = e.el as CardItemProps;
    setItemName(el.item.description);
    // console.log(el.item.image.url);
  };

  useEffect(() => {
    if (!rendererWrapperEl.current) {
      return () => {};
    }

    if (rendererWrapperEl.current) {
      myApp.current = new App({
        rendererWrapperEl: rendererWrapperEl.current,
        items: props.projectData.creativeItems,
        imagesToPreload,
        setIsLoaded,
      });

      myApp.current.addEventListener('itemchange', onItemChange);
    }

    return () => {
      if (myApp.current) {
        myApp.current.removeEventListener('itemchange', onItemChange);
        myApp.current.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (filter: string, key: number) => {
    setCurrentIndex(key);
    if (myApp.current) {
      myApp.current.setStackFilter(filter);
    }
  };

  const buttonsArray = [
    {
      label: 'All',
      filter: '',
    },
    {
      label: 'Pizza',
      filter: 'pizza',
    },
    {
      label: 'Pasta',
      filter: 'pasta',
    },
    {
      label: 'Burgers',
      filter: 'burger',
    },
  ];

  return (
    <>
      <Head {...props.head} />

      <Wrapper>
        {/* used for enabling nextjs caching */}
        {props.projectData.creativeItems.map(item => {
          return <Image key={item.image.url} src={item.image.url} />;
        })}
        <ContentWrapper animate={isLoaded ? 'animate' : 'initial'}>
          <Text italic>C&apos;mon... eat that</Text>
          <SlideItemWithKey itemKey={itemName}>
            <Text style={{ width: '100%', textTransform: 'capitalize' }}>
              {itemName}
            </Text>
          </SlideItemWithKey>

          <ButtonsWrapper>
            <Border currentIndex={currentIndex} />

            {buttonsArray.map((item, key) => {
              return (
                <ButtonContainer
                  onClick={() => handleFilterChange(item.filter, key)}
                  key={item.label}
                >
                  <Button>{item.label}</Button>
                </ButtonContainer>
              );
            })}
          </ButtonsWrapper>
          <ImageWrapper data-stack="entry"></ImageWrapper>
        </ContentWrapper>

        <KnifeWrapper>
          <Parallax offsetYMultiplier={0.02} offsetXMultiplier={0.02}>
            <KnifeSvgComp secondaryItem />
          </Parallax>
        </KnifeWrapper>

        <KnifeWrapper secondaryItem>
          <Parallax offsetYMultiplier={0.04} offsetXMultiplier={0.04}>
            <KnifeSvgComp />
          </Parallax>
        </KnifeWrapper>

        <ForkWrapper>
          <Parallax offsetYMultiplier={0.02} offsetXMultiplier={0.02}>
            <ForkSvgComp secondaryItem />
          </Parallax>
        </ForkWrapper>

        <ForkWrapper secondaryItem>
          <Parallax offsetYMultiplier={0.04} offsetXMultiplier={0.04}>
            <ForkSvgComp />
          </Parallax>
        </ForkWrapper>

        <CanvasWrapper ref={rendererWrapperEl} />
      </Wrapper>
    </>
  );
}
