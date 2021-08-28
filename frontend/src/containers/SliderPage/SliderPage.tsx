import React, { useEffect, useRef, useMemo } from 'react';

import { Head } from 'utils/seo/Head';
import { Layout } from 'components/Layout/Layout';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { breakpoints } from 'utils/responsive';

import { CanvasWrapper } from './styled/CanvasWrapper';
import { Wrapper } from './styled/Wrapper';
import { App } from './classes/App';
import { PageProps } from './data';
import { SliderItem } from './styled/Slider/SliderItem';
import { SliderWrapper } from './styled/Slider/SliderWrapper';
import { SliderItemChild } from './styled/Slider/SliderItemChild';

export default function SliderPage(props: PageProps) {
  const isTablet = useBreakpoint(breakpoints.tablet);

  const rendererWrapperEl = useRef<HTMLDivElement>(null);

  const myApp = useRef<App | null>(null);
  const appTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const imagesToPreload = useMemo(
    () => props.projectData.creativeItems.map(item => item.image.url),
    [props.projectData.creativeItems],
  );

  useEffect(() => {
    if (!rendererWrapperEl.current) {
      return () => {};
    }

    appTimeout.current = setTimeout(() => {
      if (rendererWrapperEl.current) {
        myApp.current = new App({
          rendererWrapperEl: rendererWrapperEl.current,
          items: props.projectData.creativeItems,
          imagesToPreload,
        });
      }
    }, 1);

    return () => {
      appTimeout.current && clearTimeout(appTimeout.current);
      myApp.current && myApp.current.destroy();
    };
  }, [imagesToPreload, props.projectData.creativeItems]);

  return (
    <>
      <Head {...props.head} />
      <Layout allProjects={props.allProjectsData} />

      <SliderWrapper>
        <SliderItem data-recipe="entry">
          <SliderItemChild />
        </SliderItem>
      </SliderWrapper>

      <Wrapper>
        <CanvasWrapper ref={rendererWrapperEl} />
      </Wrapper>
    </>
  );
}
