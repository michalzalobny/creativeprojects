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
import { DescriptionText } from './styled/collection/DescriptionText';
import { DescriptionTitle } from './styled/collection/DescriptionTitle';
import { DescriptionWrapper } from './styled/collection/DescriptionWrapper';

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
        <DescriptionWrapper data-cfilter="treccia" data-animation="paragraph">
          <DescriptionTitle>Treccia collection</DescriptionTitle>
          <DescriptionText>
            Every single piece of this collection is created hand-weaving
            several precious threads. Some of the twines contain precious and
            colorful stones.
          </DescriptionText>
        </DescriptionWrapper>

        <DescriptionWrapper data-cfilter="onde" data-animation="paragraph">
          <DescriptionTitle>Onde collection</DescriptionTitle>
          <DescriptionText>
            The fluid movement of the elements of this collection joins the soft
            shapes of the filigree, that looks as if floating in the structures.
            The repetition of the waves creates large but incredibly light
            earrings.
          </DescriptionText>
        </DescriptionWrapper>

        <DescriptionWrapper data-cfilter="vita" data-animation="paragraph">
          <DescriptionTitle>Vita collection</DescriptionTitle>
          <DescriptionText>
            The organic structure of the Vita collection contains minute shapes
            created with precious metal threads and small gold or silver spheres
            that unveil themselves with light reflection.
          </DescriptionText>
        </DescriptionWrapper>

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
