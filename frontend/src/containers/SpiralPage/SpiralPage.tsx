import React, { useEffect, useRef, useState } from 'react';

import { Head } from 'utils/seo/Head';
import { Layout } from 'components/Layout/Layout';
import { SlideItemWithKey } from 'components/Animations/SlideItemWithKey/SlideItemWithKey';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { breakpoints } from 'utils/responsive';
import { RevealItem } from 'components/Animations/RevealItem/RevealItem';

import { StoryItem3D } from './classes/StoryItem3D';
import { CanvasWrapper } from './styled/CanvasWrapper';
import { Wrapper } from './styled/Wrapper';
import { App } from './classes/App';
import { PageProps } from './data';
import { HeadingWrapper } from './styled/HeadingWrapper';
import { Text } from './styled/Text';
import { SmallText } from './styled/SmallText';

export default function SpiralPage(props: PageProps) {
  const rendererWrapperEl = useRef<HTMLDivElement>(null);

  const [hoveredItem, setHoveredItem] = useState<StoryItem3D | null>(null);

  const isTablet = useBreakpoint(breakpoints.tablet);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const myTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 1200 + 1500);

    return () => {
      clearTimeout(myTimeout);
    };
  }, []);

  const myApp = useRef<App | null>(null);

  useEffect(() => {
    if (!rendererWrapperEl.current) {
      return () => {};
    }

    myApp.current = new App(
      rendererWrapperEl.current,
      props.projectData.creativeItems,
      setHoveredItem,
    );

    return () => {
      myApp.current && myApp.current.destroy();
    };
  }, [props.projectData.creativeItems]);

  useEffect(() => {
    myApp.current && myApp.current.setHoveredItem(hoveredItem);
  }, [hoveredItem]);

  return (
    <>
      <Head {...props.head} />

      <HeadingWrapper animate={isVisible ? 'animate' : 'initial'}>
        <RevealItem>
          <SmallText text="the spiral space" />
        </RevealItem>

        <RevealItem>
          <SlideItemWithKey
            itemKey={
              isTablet
                ? hoveredItem
                  ? hoveredItem.storyItem.item.name
                  : 'scroll to discover'
                : 'nochange'
            }
          >
            <Text
              text={
                isTablet
                  ? hoveredItem
                    ? hoveredItem.storyItem.item.name
                    : '<span>scr</span>oll'
                  : '<span>scr</span>oll'
              }
            />
          </SlideItemWithKey>
        </RevealItem>
      </HeadingWrapper>

      <div
        style={{ width: '100%', height: '100%', backgroundColor: '#00070c' }}
      >
        <Wrapper data-spiral="wrapper">
          <CanvasWrapper ref={rendererWrapperEl} />
        </Wrapper>
      </div>
    </>
  );
}
