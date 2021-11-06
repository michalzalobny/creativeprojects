import React, { useEffect, useRef } from 'react';

import { Head } from 'utils/seo/Head';
import { Layout } from 'components/Layout/Layout';

import { CanvasWrapper } from './styled/CanvasWrapper';
import { Wrapper } from './styled/Wrapper';
import { App } from './appClasses/App';
import { PageProps } from './data';

export default function ConstellationPage(props: PageProps) {
  const rendererWrapperEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rendererWrapperEl.current) {
      return () => {};
    }
    const myApp = new App(rendererWrapperEl.current);

    return () => {
      myApp.destroy();
    };
  }, []);

  return (
    <>
      <Head {...props.head} />

      <Wrapper>
        <CanvasWrapper ref={rendererWrapperEl} />
      </Wrapper>
    </>
  );
}
