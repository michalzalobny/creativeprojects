import React from 'react';
import Link from 'next/link';

import { CustomContainer } from 'components/CustomContainer/CustomContainer';
import { sharedValues } from 'utils/sharedValues';
import { Head } from 'utils/seo/Head';
import { ThemeSelector } from 'components/ThemeSelector/ThemeSelector';
import { Parallax } from 'components/Animations/Parallax/Parallax';

import { IndexPageProps } from './data';
import { Wrapper } from './styled/Wrapper';
import { SelectorWrapper } from './styled/SelectorWrapper';

export default function IndexPage(props: IndexPageProps) {
  const { pageData } = props;

  const themeContainerRef = React.useRef(null);

  return (
    <>
      <Head {...pageData.head} />
      <Wrapper>
        <CustomContainer containerSettings={sharedValues.containers.normal}>
          <SelectorWrapper ref={themeContainerRef}>
            <Parallax
              refElement={themeContainerRef}
              offsetXMultiplier={0.05}
              offsetYMultiplier={0.05}
              shouldResetPosition
            >
              <ThemeSelector />
            </Parallax>
          </SelectorWrapper>
          <Link href="/globe">
            <h1>globe</h1>
          </Link>
        </CustomContainer>
      </Wrapper>
    </>
  );
}
