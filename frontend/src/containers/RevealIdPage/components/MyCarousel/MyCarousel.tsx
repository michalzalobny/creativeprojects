import React, { memo } from 'react';

import { Carousel } from 'components/Carousel/Carousel';

import { Wrapper } from './styled/Wrapper';
import { CarouselItem } from 'components/CarouselItem/CarouselItem';

interface MyCarouselProps {}

const data = {
  carouselData: [
    {
      name: 'test',
      description:
        'lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum',
    },
    {
      name: 'test2',
      description:
        'lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumllorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumllorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsuml',
    },
    {
      name: 'test3',
      description: 'lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsuml',
    },
  ],
};

export const MyCarousel = memo<MyCarouselProps>(props => {
  const { ...rest } = props;

  const carouselItems = () => {
    return data.carouselData.map((item, key) => (
      <CarouselItem key={item.name} />
    ));
  };

  return (
    <>
      <Wrapper {...rest}>
        <Carousel items={carouselItems()} />
      </Wrapper>
    </>
  );
});

MyCarousel.displayName = 'MyCarousel';
