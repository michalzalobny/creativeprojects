import React, { useEffect, useRef, useMemo } from 'react';

import { Head } from 'utils/seo/Head';
import { Layout } from 'components/Layout/Layout';

import { App } from './classes/App';
import { ItemProps } from './classes/types';
import { PageProps } from './data';
import * as S from './PlaygroundGalleryPage.styles';

export default function PlaygroundGalleryPage(props: PageProps) {
  const rendererWrapperEl = useRef<HTMLDivElement>(null);
  const myApp = useRef<App | null>(null);

  const imagesToPreload = useMemo(() => {
    return props.projectData.creativeItems.map((item, key) => {
      if (item.name === 'image') {
        return item.image.url;
      }
      return '';
    });
  }, [props.projectData.creativeItems]);

  const carouselItems = useMemo(() => {
    return props.projectData.creativeItems.map((item, key) => {
      const slideItem: ItemProps = {
        imageSrc: item.image.url,
        itemKey: key + 1,
        itemKeyReverse: props.projectData.creativeItems.length - key,
        type: item.name,
      };
      return slideItem;
    });
  }, [props.projectData.creativeItems]);

  useEffect(() => {
    if (!rendererWrapperEl.current) {
      return () => {};
    }

    if (rendererWrapperEl.current) {
      myApp.current = new App({
        rendererWrapperEl: rendererWrapperEl.current,
      });
    }

    return () => {
      if (myApp.current) {
        myApp.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (myApp.current) myApp.current.setItems(carouselItems);
  }, [carouselItems]);

  useEffect(() => {
    if (myApp.current) myApp.current.setImagesToPreload(imagesToPreload);
  }, [imagesToPreload]);

  return (
    <>
      <Head {...props.head} />
      <Layout allProjects={props.allProjectsData} />
      <S.Wrapper>
        <S.GalleryWrapper data-playground="wrapper">
          {[...Array(16)].map((item, key) => {
            const itemKey = key + 1;
            const columnsAmount = 4;
            const ratio = itemKey / columnsAmount;
            const itemRow = Math.floor(ratio % 1 === 0 ? ratio - 1 : ratio);
            const shouldOffset = (itemRow + 1) % 2 === 0;

            //Rendering spans conditionally allows to create and offset in the grid
            return (
              <React.Fragment key={key}>
                {!shouldOffset && <span />}
                <S.GalleryItem data-playground-item={key} />
                {shouldOffset && <span />}
              </React.Fragment>
            );
          })}
        </S.GalleryWrapper>
        <S.CanvasWrapper ref={rendererWrapperEl} />
      </S.Wrapper>
    </>
  );
}
