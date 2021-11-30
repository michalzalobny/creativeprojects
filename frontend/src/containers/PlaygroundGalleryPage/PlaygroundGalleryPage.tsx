import React, { useEffect, useRef, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { Head } from 'utils/seo/Head';

import { ModalItem } from './classes/types';
import { App } from './classes/App';
import { ItemProps } from './classes/types';
import { PageProps } from './data';
import * as S from './PlaygroundGalleryPage.styles';
import { Modal } from './components/Modal/Modal';
import { appState } from './appState';

export default function PlaygroundGalleryPage(props: PageProps) {
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState<null | ModalItem>(null);

  const rendererWrapperEl = useRef<HTMLDivElement>(null);

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
        mediaSrc: item.image.url,
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
      appState.app = new App({
        rendererWrapperEl: rendererWrapperEl.current,
        setIsReady,
        setModalItem,
        setShowModal,
      });
    }

    return () => {
      if (appState.app) {
        appState.app.destroy();
        appState.app = null;
      }
    };
  }, []);

  useEffect(() => {
    window.requestAnimationFrame(() => {
      if (appState.app) appState.app.setItems(carouselItems);
    });
  }, [carouselItems]);

  useEffect(() => {
    window.requestAnimationFrame(() => {
      if (appState.app) appState.app.setItemsToPreload(itemsToPreload);
    });
  }, [itemsToPreload]);

  useEffect(() => {
    if (showModal) {
      appState.app && appState.app.setIsModalOpened(true);
    } else {
      appState.app && appState.app.setIsModalOpened(false);
    }
  }, [showModal]);

  return (
    <>
      <Head {...props.head} />

      <S.Wrapper>
        <AnimatePresence>
          {showModal && (
            <Modal
              modalItem={modalItem}
              setShowModal={setShowModal}
              initial="initial"
              animate="animate"
              exit="exit"
            />
          )}
        </AnimatePresence>

        <S.GalleryWrapper data-playground="wrapper">
          {[...Array(4)].map((_, rowKey) => {
            return (
              <S.RowWrapper key={rowKey + 'row'}>
                {[...Array(4)].map((_, elKey) => {
                  return (
                    <React.Fragment key={elKey + 'el'}>
                      {elKey === 0 && (
                        <S.GallerySpacer half={rowKey % 2 !== 0} />
                      )}
                      <S.GalleryItem
                        data-playground-item={elKey + rowKey * 4}
                      />
                      <S.GallerySpacer half={elKey === 3 && rowKey % 2 === 0} />
                    </React.Fragment>
                  );
                })}
              </S.RowWrapper>
            );
          })}
        </S.GalleryWrapper>
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
