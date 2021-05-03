import { globalState } from 'utils/globalState';

export const retrieveScrollPosition = (routeName: string): number => {
  const pagePositions = globalState.pagePositions;
  let scrollValue = 0;

  Object.entries(pagePositions).forEach(pagePosition => {
    if (pagePosition[0] === routeName) {
      scrollValue = pagePosition[1] as number;
    }
  });
  return scrollValue;
};
