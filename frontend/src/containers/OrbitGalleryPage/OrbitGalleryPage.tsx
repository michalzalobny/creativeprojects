import React, { useEffect, useRef } from 'react';

import { Head } from 'utils/seo/Head';
import { Layout } from 'components/Layout/Layout';

import { CanvasWrapper } from './styled/CanvasWrapper';
import { Wrapper } from './styled/Wrapper';
import { App } from './classes/App';
import { PageProps } from './data';
import { GalleryItem } from './styled/Gallery/GalleryItem';
import { GalleryWrapper } from './styled/Gallery/GalleryWrapper';
import { Image } from './styled/Gallery/Image';

export default function OrbitGalleryPage(props: PageProps) {
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

  return (
    <>
      <Head {...props.head} />
      <Layout allProjects={props.allProjectsData} />

      <Wrapper>
        <GalleryWrapper data-gallery="wrapper">
          {props.projectData.creativeItems.map(item => {
            return (
              <GalleryItem data-gallery="entry" key={item.image.url}>
                <Image src={item.image.url} />
              </GalleryItem>
            );
          })}
        </GalleryWrapper>
        <CanvasWrapper ref={rendererWrapperEl} />
      </Wrapper>
    </>
  );
}
