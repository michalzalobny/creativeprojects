import React, { useEffect, useRef, useMemo } from 'react';

import { Head } from 'utils/seo/Head';
import { Layout } from 'components/Layout/Layout';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { breakpoints } from 'utils/responsive';
import { Parallax } from 'components/Animations/Parallax/Parallax';
import { RevealButterflyString } from 'components/Animations/RevealButterflyString/RevealButterflyString';

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
import { Text } from './styled/Slider/Text';

export default function CardLeaderPage(props: PageProps) {
  const isTablet = useBreakpoint(breakpoints.tablet);

  const rendererWrapperEl = useRef<HTMLDivElement>(null);

  const [isFollowing, setIsFollowing] = useState(false);
  const [isAnimatedIn, setIsAnimatedIn] = useState(false);

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
          setIsFollowing,
          setIsAnimatedIn,
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
        {props.projectData.creativeItems.map((item, key) => {
          return (
            <SliderItem key={item.image.url} data-recipe="entry">
              <SliderItemChild />
            </SliderItem>
          );
        })}
      </SliderWrapper>

      <Wrapper>
        <SignContainer animate={isFollowing ? 'animate' : 'initial'}>
          <SignWrapper>
            <Parallax offsetXMultiplier={-0.05} offsetYMultiplier={-0.05}>
              <SignSvgComp />
            </Parallax>
          </SignWrapper>
        </SignContainer>

        <Text>
          <RevealButterflyString
            text={'HOLD MOUSE TO LEAD'}
            shouldAnimate={!isFollowing && isAnimatedIn}
          />
        </Text>

        <CanvasWrapper ref={rendererWrapperEl} />
      </Wrapper>
    </>
  );
}
