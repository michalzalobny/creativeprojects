import React, { memo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { swipePower } from './utils/swipePower';
import { wrap } from './utils/wrap';
import { SWIPIE_CONFIDENCE_THRESHOLD } from './constants';
import { Wrapper } from './styled/Wrapper';
import { ItemsContainer } from './styled/ItemsContainer';
import { Item } from './styled/Item';
import { PropsItem } from './components/PropsItem/PropsItem';
import { variants } from './framerPresets';
import { NavArrowNext } from './styled/NavArrowNext';
import { NavArrowPrev } from './styled/NavArrowPrev';
import { NavDotsBottom } from './styled/NavDotsBottom';

interface CarouselProps {
  items: JSX.Element[];
}

export const Carousel = memo<CarouselProps>(props => {
  const { children, items, ...rest } = props;

  const [containerHeight, setContainerHeight] = useState(1);
  const [[page, direction], setPage] = useState([0, 0]);
  const itemIndex = wrap(0, items.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const updateContainerHeight = (e: HTMLDivElement) => {
    e && setContainerHeight(e.clientHeight);
  };

  return (
    <>
      <Wrapper {...rest}>
        <ItemsContainer
          style={{ height: containerHeight }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragTransition={{
            bounceStiffness: 80,
            bounceDamping: 15,
          }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -SWIPIE_CONFIDENCE_THRESHOLD) {
              paginate(1);
            } else if (swipe > SWIPIE_CONFIDENCE_THRESHOLD) {
              paginate(-1);
            }
          }}
        >
          <AnimatePresence initial={false} custom={direction}>
            <Item
              key={page}
              custom={direction}
              variants={variants}
              initial="carouselInitial"
              animate="carouselAnimate"
              exit="carouselExit"
              transition={{
                x: {
                  type: 'spring',
                  stiffness: 80,
                  damping: 15,
                  restDelta: 0.01, //Used to disable "snaping" the item too early
                  restSpeed: 0.01,
                },
                opacity: { duration: 0.5 },
              }}
            >
              <PropsItem
                direction={direction}
                currentItem={items[itemIndex]}
                ref={e => updateContainerHeight(e)}
              />
            </Item>
          </AnimatePresence>
        </ItemsContainer>

        <NavArrowPrev
          onClick={() => paginate(-1)}
          paginate={(newDirection: number) => paginate(newDirection)}
        />
        <NavArrowNext
          inverse
          onClick={() => paginate(1)}
          paginate={(newDirection: number) => paginate(newDirection)}
        />
        <NavDotsBottom
          currentIndex={itemIndex}
          items={items}
          seekTo={(offset: number) => setPage([offset, 1])}
        />
      </Wrapper>
    </>
  );
});

Carousel.displayName = 'Carousel';
