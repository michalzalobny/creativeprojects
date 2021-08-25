import React, { useEffect, useRef } from 'react';
import chunk from 'lodash/chunk';

import { Head } from 'utils/seo/Head';
import { Layout } from 'components/Layout/Layout';

import { CanvasWrapper } from './styled/CanvasWrapper';
import { Wrapper } from './styled/Wrapper';
import { App } from './classes/App';
import { PageProps } from './data';
import { GalleryItem } from './styled/Gallery/GalleryItem';
import { GalleryWrapper } from './styled/Gallery/GalleryWrapper';
import { Image } from './styled/Gallery/Image';
import { GalleryGroup } from './styled/Gallery/GalleryGroup';

export default function OrbitGalleryPage(props: PageProps) {
  const SPACING_MOBILE = 3;
  const SPACING_TABLET = 6;

  const rendererWrapperEl = useRef<HTMLDivElement>(null);

  const myApp = useRef<App | null>(null);

  useEffect(() => {
    if (!rendererWrapperEl.current) {
      return () => {};
    }

    myApp.current = new App(
      rendererWrapperEl.current,
      props.projectData.creativeItems,
    );

    return () => {
      myApp.current && myApp.current.destroy();
    };
  }, [props.projectData.creativeItems]);

  const galleryComponents = props.projectData.creativeItems.map(item => {
    return (
      <GalleryItem
        spacingMobile={SPACING_MOBILE}
        spacingTablet={SPACING_TABLET}
        data-src={`${item.image.url}`}
        data-gallery="entry"
        key={item.image.url}
      >
        <Image src={item.image.url} />
      </GalleryItem>
    );
  });

  const groupedGalleryComponents = chunk(galleryComponents, 3);

  return (
    <>
      <Head {...props.head} />
      <Layout allProjects={props.allProjectsData} />

      <Wrapper>
        <GalleryWrapper data-gallery="wrapper">
          {groupedGalleryComponents.map((group, key) => {
            return (
              <GalleryGroup
                spacingMobile={SPACING_MOBILE}
                spacingTablet={SPACING_TABLET}
                translation={key * 20}
                key={group[0].key + group[0].props}
              >
                {group}
              </GalleryGroup>
            );
          })}
        </GalleryWrapper>
        <CanvasWrapper ref={rendererWrapperEl} />
      </Wrapper>
    </>
  );
}
