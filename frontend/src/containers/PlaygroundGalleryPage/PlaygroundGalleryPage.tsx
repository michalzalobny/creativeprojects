import React, { useEffect, useRef, useMemo, useState } from 'react';

import { Head } from 'utils/seo/Head';

import { App } from './classes/App';
import { ItemProps } from './classes/types';
import { PageProps } from './data';
import * as S from './PlaygroundGalleryPage.styles';
import { Modal } from './components/Modal/Modal';

const Gallery = () => {
  return (
    <S.GalleryWrapper data-playground="wrapper">
      <S.RowWrapper>
        <S.GallerySpacer />
        <S.GalleryItem data-playground-item="0" />
        <S.GallerySpacer />
        <S.GalleryItem data-playground-item="1" />
        <S.GallerySpacer />
        <S.GalleryItem data-playground-item="2" />
        <S.GallerySpacer />
        <S.GalleryItem data-playground-item="3" />
        <S.GallerySpacer half />
      </S.RowWrapper>
      <S.RowWrapper>
        <S.GallerySpacer half />
        <S.GalleryItem data-playground-item="4" />
        <S.GallerySpacer />
        <S.GalleryItem data-playground-item="5" />
        <S.GallerySpacer />
        <S.GalleryItem data-playground-item="6" />
        <S.GallerySpacer />
        <S.GalleryItem data-playground-item="7" />
        <S.GallerySpacer />
      </S.RowWrapper>
      <S.RowWrapper>
        <S.GallerySpacer />
        <S.GalleryItem data-playground-item="8" />
        <S.GallerySpacer />
        <S.GalleryItem data-playground-item="9" />
        <S.GallerySpacer />
        <S.GalleryItem data-playground-item="10" />
        <S.GallerySpacer />
        <S.GalleryItem data-playground-item="11" />
        <S.GallerySpacer half />
      </S.RowWrapper>
      <S.RowWrapper>
        <S.GallerySpacer half />
        <S.GalleryItem data-playground-item="12" />
        <S.GallerySpacer />
        <S.GalleryItem data-playground-item="13" />
        <S.GallerySpacer />
        <S.GalleryItem data-playground-item="14" />
        <S.GallerySpacer />
        <S.GalleryItem data-playground-item="15" />
        <S.GallerySpacer />
      </S.RowWrapper>
    </S.GalleryWrapper>
  );
};

export default function PlaygroundGalleryPage(props: PageProps) {
  const rendererWrapperEl = useRef<HTMLDivElement>(null);
  const myApp = useRef<App | null>(null);

  const [isReady, setIsReady] = useState(false);

  const itemsToPreload = useMemo(() => {
    return props.projectData.creativeItems.map(item => {
      if (item.name === 'image') {
        return {
          src: item.image.url,
          type: 'image',
        };
      } else if (item.name === 'video') {
        return {
          src: item.image.url,
          type: 'video',
        };
      } else if (item.name === '3dmodel') {
        return {
          src: item.image.url,
          type: '3dmodel',
        };
      }
      return null;
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
        setIsReady,
      });
    }

    return () => {
      if (myApp.current) {
        myApp.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    window.requestAnimationFrame(() => {
      if (myApp.current) myApp.current.setItems(carouselItems);
    });
  }, [carouselItems]);

  useEffect(() => {
    window.requestAnimationFrame(() => {
      if (myApp.current) myApp.current.setItemsToPreload(itemsToPreload);
    });
  }, [itemsToPreload]);

  return (
    <>
      <Head {...props.head} />

      <S.Wrapper>
        <Modal />
        <Gallery />
        <S.CanvasWrapper
          variants={{ initial: { opacity: 0 }, animate: { opacity: 1 } }}
          initial="initial"
          animate={isReady ? 'animate' : 'initial'}
          ref={rendererWrapperEl}
        />
      </S.Wrapper>
    </>
  );
}
