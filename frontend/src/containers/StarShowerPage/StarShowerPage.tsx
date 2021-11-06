import React, { useEffect, useRef } from 'react';

import { Head } from 'utils/seo/Head';
import { Layout } from 'components/Layout/Layout';

import { CanvasWrapper } from './styled/CanvasWrapper';
import { Wrapper } from './styled/Wrapper';
import { App } from './appClasses/App';
import { Text } from './styled/Text';
import { InfoWrapper } from './styled/InfoWrapper';
import { InfoBackground } from './styled/InfoBackground';
import { useState } from 'react';
import { PageProps } from './data';

export default function StarShowerPage(props: PageProps) {
  const rendererWrapperEl = useRef<HTMLDivElement>(null);
  const [hideInfo, setHideInfo] = useState(false);

  useEffect(() => {
    if (!rendererWrapperEl.current) {
      return () => {};
    }
    const myApp = new App(rendererWrapperEl.current);

    return () => {
      myApp.destroy();
    };
  }, []);

  useEffect(() => {
    const refItem = rendererWrapperEl.current;
    if (!refItem) {
      return () => {};
    }
    const onPointerDown = () => {
      setHideInfo(true);
    };

    refItem.addEventListener('pointerdown', onPointerDown);
    return () => {
      refItem.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  return (
    <>
      <Head {...props.head} />

      <Wrapper>
        <CanvasWrapper ref={rendererWrapperEl} />
        <InfoWrapper animate={hideInfo ? 'animate' : 'initial'}>
          <InfoBackground />
          <Text>Swipe for a star!</Text>
        </InfoWrapper>
      </Wrapper>
    </>
  );
}
