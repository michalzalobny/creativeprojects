import React, { useEffect, useRef, useState } from 'react';

import { Head } from 'utils/seo/Head';
import { Layout } from 'components/Layout/Layout';
import { SlideItemWithKey } from 'components/Animations/SlideItemWithKey/SlideItemWithKey';

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
      <Layout allProjects={props.allProjectsData} />

      <HeadingWrapper>
        <SmallText text="the spiral" />

        <SlideItemWithKey
          itemKey={
            hoveredItem ? hoveredItem.storyItem.item.name : 'scroll to discover'
          }
        >
          <Text
            text={
              hoveredItem
                ? hoveredItem.storyItem.item.name
                : '<span>scr</span>oll'
            }
          />
        </SlideItemWithKey>
      </HeadingWrapper>

      <Wrapper>
        <CanvasWrapper ref={rendererWrapperEl} />
      </Wrapper>
    </>
  );
}
