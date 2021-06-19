import React, { useEffect, useRef } from 'react';

import { Head } from 'utils/seo/Head';

import { IndexPageProps } from './data';
import { CanvasWrapper } from './styled/CanvasWrapper';
import { Wrapper } from './styled/Wrapper';

export default function IndexPage(props: IndexPageProps) {
  const { pageData } = props;

  const rendererWrapperEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { app } = require('./functions/app');
    const { destroy, init } = app({
      rendererWrapperEl: rendererWrapperEl,
    });

    init();
    return () => {
      destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head {...pageData.head} />
      <Wrapper>
        <CanvasWrapper ref={rendererWrapperEl} />
      </Wrapper>
    </>
  );
}
