import React, { useEffect, useRef, useMemo } from 'react';

import { Head } from 'utils/seo/Head';
import { Layout } from 'components/Layout/Layout';

import { CanvasWrapper } from './styled/CanvasWrapper';
import { Wrapper } from './styled/Wrapper';
import { App } from './classes/App';
import { PageProps } from './data';
import { SliderItem } from './styled/Slider/SliderItem';
import { SliderWrapper } from './styled/Slider/SliderWrapper';
import { SliderItemChild } from './styled/Slider/SliderItemChild';
import { SignWrapper } from './styled/Slider/SignWrapper';
import { SignSvgComp } from './styled/Slider/SignSvgComp';
import { useState } from 'react';
import { SignContainer } from './styled/Slider/SignContainer';
import { App as App2D } from './2D/App';

export default function CardLeaderPage(props: PageProps) {
  const rendererWrapperEl = useRef<HTMLDivElement>(null);
  const renderer2D = useRef<HTMLDivElement>(null);

  const [isFollowing, setIsFollowing] = useState(false);

  const myApp = useRef<App | null>(null);
  const app2D = useRef<App2D | null>(null);

  const imagesToPreload = useMemo(
    () => props.projectData.creativeItems.map(item => item.image.url),
    [props.projectData.creativeItems],
  );

  useEffect(() => {
    if (!rendererWrapperEl.current) {
      return () => {};
    }

    if (rendererWrapperEl.current) {
      myApp.current = new App({
        rendererWrapperEl: rendererWrapperEl.current,
        items: props.projectData.creativeItems,
        imagesToPreload,
        setIsFollowing,
      });
    }

    return () => {
      myApp.current && myApp.current.destroy();
    };
  }, [imagesToPreload, props.projectData.creativeItems]);

  useEffect(() => {
    if (!renderer2D.current) {
      return () => {};
    }

    if (renderer2D.current) {
      app2D.current = new App2D(renderer2D.current);
    }

    return () => {
      app2D.current && app2D.current.destroy();
    };
  }, []);

  return (
    <>
      <Head {...props.head} />
      <Layout allProjects={props.allProjectsData} />

      <SliderWrapper>
        {props.projectData.creativeItems.map((item, key) => {
          return (
            <SliderItem key={item.image.url} data-follow="entry">
              <SliderItemChild>
                <img
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  src={item.image.url}
                  alt=""
                />
              </SliderItemChild>
            </SliderItem>
          );
        })}
      </SliderWrapper>

      <Wrapper>
        <SignContainer animate={isFollowing ? 'animate' : 'initial'}>
          <SignWrapper>
            <SignSvgComp />
          </SignWrapper>
        </SignContainer>

        <CanvasWrapper ref={rendererWrapperEl} />
        <CanvasWrapper
          style={{ zIndex: 20, mixBlendMode: 'difference' }} //The color of element in canvas has to be white to make the "difference" work
          ref={renderer2D}
        />
      </Wrapper>
    </>
  );
}
