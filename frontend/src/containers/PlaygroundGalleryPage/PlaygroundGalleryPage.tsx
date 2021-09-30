import React, { useEffect, useRef } from 'react';

import { Head } from 'utils/seo/Head';
import { Layout } from 'components/Layout/Layout';

import { App } from './classes/App';
import { PageProps } from './data';
import * as S from './PlaygroundGalleryPage.styles';

export default function PlaygroundGalleryPage(props: PageProps) {
  const rendererWrapperEl = useRef<HTMLDivElement>(null);
  const myApp = useRef<App | null>(null);

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
