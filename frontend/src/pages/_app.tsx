import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import FontFaceObserver from 'fontfaceobserver';

import { GlobalStyles } from 'utils/styled/GlobalStyles';
import { PageWrapper } from 'components/PageWrapper/PageWrapper';
import 'utils/styled/fontFace.css';
import 'focus-visible';
import { ExampleContextProvider } from 'context/ExampleContext';
import { TouchPinch } from 'containers/PlaygroundGalleryPage/classes/Singletons/TouchPinch';
import { Layout } from 'components/Layout/Layout';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    setIsInit(true);
  }, [isInit]);

  useEffect(() => {
    const x = TouchPinch.getInstance();
    //https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
    const updateVh = () => {
      // We execute the same script as before
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    window.addEventListener('resize', updateVh);
    updateVh();
    return () => {
      window.removeEventListener('resize', updateVh);
    };
  }, []);

  useEffect(() => {
    document.body.style.cursor = 'initial';
    const links = document.links;

    for (let i = 0, linksLength = links.length; i < linksLength; i++) {
      if (links[i].hostname !== window.location.hostname) {
        links[i].target = '_blank';
      }
    }
  }, [router.route + router.locale]);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fontA = new FontFaceObserver('Open Sans');
    const fontB = new FontFaceObserver('1');
    const fontC = new FontFaceObserver('2');
    const fontD = new FontFaceObserver('Playfair');

    const maxTimeout = 1000;

    Promise.all([
      fontA.load(null, maxTimeout),
      fontB.load(null, maxTimeout),
      fontC.load(null, maxTimeout),
      fontD.load(null, maxTimeout),
    ])
      .then(
        () => {
          setIsReady(true);
        },
        () => {
          console.warn(`Fonts were loading too long (over ${maxTimeout}ms)`);
          setIsReady(true);
        },
      )
      .catch(err => {
        console.warn('Some critical font are not available:', err);
        setIsReady(true);
      });

    return () => {};
  }, []);

  return (
    <ExampleContextProvider>
      <GlobalStyles />

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          zIndex: 200,
          display: isReady ? 'none' : 'initial',
        }}
      ></div>
      <AnimatePresence exitBeforeEnter={false}>
        <>
          <Layout />
          <PageWrapper
            router={router}
            isInit={isInit}
            key={router.route + router.locale}
          >
            <Component router={router} {...pageProps} />
          </PageWrapper>
        </>
      </AnimatePresence>
      {/* <FPSStats /> */}
    </ExampleContextProvider>
  );
}
