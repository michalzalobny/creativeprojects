import React, { useEffect, useRef } from 'react';

import { Head } from 'utils/seo/Head';
import { Layout } from 'components/Layout/Layout';

import { CanvasWrapper } from './styled/CanvasWrapper';
import { Wrapper } from './styled/Wrapper';
import { App } from './classes/App';
import { PageProps } from './data';

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
        <CanvasWrapper ref={rendererWrapperEl} />
      </Wrapper>
    </>
  );
}
