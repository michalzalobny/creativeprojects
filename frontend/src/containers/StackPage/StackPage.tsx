import React, { useEffect, useRef, useMemo } from 'react';

import { Head } from 'utils/seo/Head';
import { Layout } from 'components/Layout/Layout';

import { CanvasWrapper } from './styled/CanvasWrapper';
import { Wrapper } from './styled/Wrapper';
import { App } from './classes/App';
import { PageProps } from './data';
import { Text } from './styled/stack/Text';
import { ContentWrapper } from './styled/stack/ContentWrapper';
import { ImageWrapper } from './styled/stack/ImageWrapper';
import { Image } from './styled/stack/Image';

export default function StackPage(props: PageProps) {
  const rendererWrapperEl = useRef<HTMLDivElement>(null);
  const myApp = useRef<App | null>(null);

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
      });
    }

    return () => {
      myApp.current && myApp.current.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head {...props.head} />
      <Layout allProjects={props.allProjectsData} />
      <Wrapper>
        {/* used for enabling nextjs caching */}
        {props.projectData.creativeItems.map(item => {
          return <Image key={item.image.url} src={item.image.url} />;
        })}
        <ContentWrapper>
          <Text italic>C&apos;mon... eat that</Text>
          <Text>Carbonarra with mushrooms</Text>

          <ImageWrapper data-stack="entry"></ImageWrapper>
        </ContentWrapper>

        <CanvasWrapper ref={rendererWrapperEl} />
      </Wrapper>
    </>
  );
}
