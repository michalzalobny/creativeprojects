import React, { useEffect, useRef } from 'react';

import { Head } from 'utils/seo/Head';
import { Layout } from 'components/Layout/Layout';

import { StoryItem3D } from './classes/StoryItem3D';
import { CanvasWrapper } from './styled/CanvasWrapper';
import { Wrapper } from './styled/Wrapper';
import { App } from './classes/App';
import { PageProps } from './data';
import { useState } from 'react';

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
      <Wrapper>
        <CanvasWrapper ref={rendererWrapperEl} />
      </Wrapper>
    </>
  );
}
