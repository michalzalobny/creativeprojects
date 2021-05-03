import React, { memo, useRef, useEffect } from 'react';
import { MotionValue, motion, useTransform, useSpring } from 'framer-motion';

import { Wrapper } from './styled/Wrapper';
import { Item } from './styled/Item';
import { ItemWrapper } from './styled/ItemWrapper';
import { SeekTo } from 'components/InfiniteTimeline/hooks/useSeekTo';
import { modVertical } from './utils/modVertical';
import { modHorizontal } from './utils/modHorizontal';

interface InfiniteTimelineItemProps {
  seekTo?: (SeekTo: SeekTo) => {}; //Passed by InfiniteTimelineComponent
  children: React.ReactNode;
  offsetX?: MotionValue; //Passed by InfiniteTimelineComponent
  offsetY?: MotionValue; //Passed by InfiniteTimelineComponent
  contentWidth?: React.MutableRefObject<number>;
  contentHeight?: React.MutableRefObject<number>;
}

export const InfiniteTimelineItem = memo<InfiniteTimelineItemProps>(props => {
  const {
    offsetX,
    offsetY,
    children,
    seekTo,
    contentWidth,
    contentHeight,
  } = props;

  const [elOffsetX, setElOffsetX] = React.useState(0);
  const [elOffsetY, setElOffsetY] = React.useState(0);

  const onResize = () => {
    setElOffsetY(elRef.current.getBoundingClientRect().y);
    setElOffsetX(elRef.current.getBoundingClientRect().x);
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);
    onResize();

    return () => {
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const elRef = useRef(null);

  const xMvSpring = useSpring(offsetX, { stiffness: 1000, damping: 200 });
  const yMvSpring = useSpring(offsetY, { stiffness: 800, damping: 100 });

  const xMv = useTransform(xMvSpring, latestXMvSpring => {
    return modHorizontal(latestXMvSpring, contentWidth.current, elRef);
  });

  const yMv = useTransform(yMvSpring, latestYMvSpring => {
    return modVertical(latestYMvSpring, contentHeight.current, elRef);
  });

  return (
    <>
      <Wrapper ref={elRef}>
        <motion.div style={{ x: xMv, y: yMv }}>
          <ItemWrapper
            onClick={() =>
              seekTo({
                seekPxMobile: -elOffsetY,
                mobileOffset: 0,
                seekPxTablet: -elOffsetX,
                tabletOffset: 0,
              })
            }
          >
            <Item>{children}</Item>
          </ItemWrapper>
        </motion.div>
      </Wrapper>
    </>
  );
});

InfiniteTimelineItem.displayName = 'InfiniteTimelineItem';
