import React from 'react';

import { InfiniteTimeline } from 'components/InfiniteTimeline/InfiniteTimeline';
import { InfiniteTimelineItem } from 'components/InfiniteTimelineItem/InfiniteTimelineItem';

import { Wrapper } from './styled/Wrapper';

interface Props {}

export default function PrivacyPolicyPage(props: Props) {
  return (
    <>
      <Wrapper>
        <InfiniteTimeline>
          <InfiniteTimelineItem>1</InfiniteTimelineItem>
          <InfiniteTimelineItem>2</InfiniteTimelineItem>
          <InfiniteTimelineItem>3</InfiniteTimelineItem>
          <InfiniteTimelineItem>4</InfiniteTimelineItem>
        </InfiniteTimeline>
      </Wrapper>
    </>
  );
}
