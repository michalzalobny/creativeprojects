import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

import { GlobalStyles } from 'utils/styled/GlobalStyles';
import { Layout } from 'components/Layout/Layout';
import { PageWrapper } from 'components/PageWrapper/PageWrapper';
import 'utils/styled/fontFace.css';
import 'focus-visible';
import FPSStats from 'react-fps-stats';

import { ExampleContextProvider } from 'context/ExampleContext';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    setIsInit(true);
  }, [isInit]);

  React.useLayoutEffect(() => {
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
    const links = document.links;

    for (let i = 0, linksLength = links.length; i < linksLength; i++) {
      if (links[i].hostname !== window.location.hostname) {
        links[i].target = '_blank';
      }
    }
  }, [router.route + router.locale]);

  return (
    <ExampleContextProvider>
      <GlobalStyles />
      <Layout />
      <AnimatePresence exitBeforeEnter={false}>
        <PageWrapper
          router={router}
          isInit={isInit}
          key={router.route + router.locale}
        >
          <Component router={router} {...pageProps} />
        </PageWrapper>
      </AnimatePresence>
      {/* <FPSStats /> */}
    </ExampleContextProvider>
  );
}
