import React, { useEffect, useRef } from 'react';

import { Head } from 'utils/seo/Head';
import { Layout } from 'components/Layout/Layout';

import { CanvasWrapper } from './styled/CanvasWrapper';
import { Wrapper } from './styled/Wrapper';
import { App } from './classes/App';
import { PageProps } from './data';

export default function SpiralPage(props: PageProps) {
  const rendererWrapperEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rendererWrapperEl.current) {
      return () => {};
    }
    const myApp = new App(
      rendererWrapperEl.current,
      props.projectData.creativeItems,
    );

    return () => {
      myApp.destroy();
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
