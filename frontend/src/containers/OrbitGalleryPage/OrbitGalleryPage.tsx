import React, { useEffect, useRef, useMemo, useState } from 'react';

import { Head } from 'utils/seo/Head';
import { Layout } from 'components/Layout/Layout';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { breakpoints } from 'utils/responsive';
import { CreativeItem } from 'utils/types/strapi/CreativeItem';
import { RevealButterflyString } from 'components/Animations/RevealButterflyString/RevealButterflyString';

import { CanvasWrapper } from './styled/CanvasWrapper';
import { Wrapper } from './styled/Wrapper';
import { App } from './classes/App';
import { PageProps } from './data';
import { GalleryItem } from './styled/Gallery/GalleryItem';
import { GalleryWrapper } from './styled/Gallery/GalleryWrapper';
import { Image } from './styled/Gallery/Image';
import { Text } from './styled/Gallery/Text';
import { TextWrapper } from './styled/Gallery/TextWrapper';
import { TextsContainer } from './styled/Gallery/TextsContainer';

interface GalleryComp {
  items: CreativeItem[];
  columnsCount: number;
}

const GalleryComp = ({ items, columnsCount }: GalleryComp) => {
  return (
    <>
      {items.map((item, key) => {
        let groupNumber = 0;

        for (let i = 1; i <= columnsCount; i++) {
          if ((key + 1 - i) % columnsCount === 0) {
            groupNumber = i;
            break;
          }
        }

        return (
          <GalleryItem
            groupNumber={groupNumber}
            data-gallery="entry"
            key={item.image.url + key}
          >
            <Image src={item.image.url} />
          </GalleryItem>
        );
      })}
    </>
  );
};

export default function OrbitGalleryPage(props: PageProps) {
  const [isPanning, setIsPanning] = useState(false);
  const isTablet = useBreakpoint(breakpoints.tablet);

  const COLUMNS_COUNT = useMemo(() => (isTablet ? 7 : 3), [isTablet]);

  const rendererWrapperEl = useRef<HTMLDivElement>(null);

  const myApp = useRef<App | null>(null);

  const creativeItems = useMemo(
    () => [
      ...props.projectData.creativeItems,
      ...props.projectData.creativeItems,
    ],
    [props.projectData.creativeItems],
  );

  const imagesToPreload = useMemo(
    () => props.projectData.creativeItems.map(item => item.image.url),
    [props.projectData.creativeItems],
  );

  useEffect(() => {
    if (!rendererWrapperEl.current) {
      return () => {};
    }

    myApp.current = new App(
      rendererWrapperEl.current,
      creativeItems,
      imagesToPreload,
      setIsPanning,
    );

    return () => {
      myApp.current && myApp.current.destroy();
    };
  }, [creativeItems, imagesToPreload]);

  return (
    <>
      <Head {...props.head} />
      <Layout allProjects={props.allProjectsData} />

      <Wrapper>
        <GalleryWrapper columnsCount={COLUMNS_COUNT} data-gallery="wrapper">
          <GalleryComp items={creativeItems} columnsCount={COLUMNS_COUNT} />
        </GalleryWrapper>
        <TextsContainer data-updatecss="texts-container">
          <TextWrapper isPanning={isPanning}>
            <Text>
              <RevealButterflyString
                shouldAnimate={!isPanning}
                text={'Swipe'}
              />
            </Text>
          </TextWrapper>
          <TextWrapper isPanning={isPanning}>
            <Text>
              <RevealButterflyString
                shouldAnimate={!isPanning}
                text={'Discover'}
              />
            </Text>
          </TextWrapper>
          <TextWrapper isPanning={isPanning}>
            <Text>
              <RevealButterflyString
                shouldAnimate={!isPanning}
                text={'Culture'}
              />
            </Text>
          </TextWrapper>
        </TextsContainer>
        <CanvasWrapper ref={rendererWrapperEl} />
      </Wrapper>
    </>
  );
}
