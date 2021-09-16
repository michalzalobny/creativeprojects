import React, { useEffect, useRef, useMemo, useState } from 'react';

import { Head } from 'utils/seo/Head';
import { Layout } from 'components/Layout/Layout';

import { CanvasWrapper } from './styled/CanvasWrapper';
import { Wrapper } from './styled/Wrapper';
import { App } from './classes/App';
import { PageProps } from './data';
import { CollectionWrapper } from './styled/collection/CollectionWrapper';
import { ContentWrapper } from './styled/collection/ContentWrapper';
import { Image } from './styled/collection/Image';
import { ImageWrapper } from './styled/collection/ImageWrapper';

export default function UniqueCollectionPage(props: PageProps) {
  const rendererWrapperEl = useRef<HTMLDivElement>(null);
  const myApp = useRef<App | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  const imagesToPreload = useMemo(() => {
    const coverImages = props.projectData.creativeItems.map(
      item => item.image.url,
    );
    const backImages = props.projectData.creativeItems.map(
      item => item.secondaryImage.url,
    );
    return [...coverImages, ...backImages];
  }, [props.projectData.creativeItems]);

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
    }

    return () => {
      if (myApp.current) {
        myApp.current.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head {...props.head} />
      <Layout allProjects={props.allProjectsData} />
      <Wrapper>
        <ContentWrapper>
          <CollectionWrapper data-collection-wrapper="wrapper">
            {props.projectData.creativeItems.map(item => {
              return (
                <ImageWrapper data-src={item.image.url} key={item.image.url}>
                  <Image src={item.image.url} />
                </ImageWrapper>
              );
            })}
          </CollectionWrapper>
        </ContentWrapper>
        <CanvasWrapper ref={rendererWrapperEl} />
      </Wrapper>
    </>
  );
}
