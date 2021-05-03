import { NextRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useElementScroll } from 'framer-motion';

import { globalState } from 'utils/globalState';

import { retrieveScrollPosition } from './utils/retrieveScrollPosition';
import { saveScrollPosition } from './utils/saveScrollPosition';
import { Wrapper } from './styled/Wrapper';
import { PageContentWrapper } from './styled/PageContentWrapper';
import { basicTransition, notInitialized } from './framerPresets';

interface PageWrapperProps {
  children: JSX.Element;
  router: NextRouter;
  isInit: boolean;
}

export const PageWrapper = React.memo<PageWrapperProps>(props => {
  const { children, router, isInit } = props;
  const pageRef = React.useRef<HTMLDivElement>(null);
  const lastWrapper = React.useRef<HTMLDivElement>(null);

  globalState.scrollValues = useElementScroll(pageRef);
  globalState.pageWrapper = pageRef;

  useEffect(() => {
    const pageRefScroll = retrieveScrollPosition(router.route + router.locale);

    pageRef.current.scrollTop = pageRefScroll;

    lastWrapper.current = pageRef.current;
    const lastRoute = router.route + router.locale;

    return () => saveScrollPosition(lastWrapper.current.scrollTop, lastRoute);
  }, [router.route, router.locale, pageRef]);

  return (
    <>
      <PageContentWrapper {...(isInit ? basicTransition : notInitialized)}>
        <Wrapper ref={pageRef}>{React.cloneElement(children)}</Wrapper>
      </PageContentWrapper>
    </>
  );
});

PageWrapper.displayName = 'PageWrapper';
