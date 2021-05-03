import { globalState } from 'utils/globalState';

export const saveScrollPosition = (scrollTop: number, routeName: string) => {
  const newPagePositions = globalState.pagePositions;
  if (Object.entries(newPagePositions).length === 0) {
    newPagePositions[routeName] = scrollTop;
  } else {
    Object.entries(newPagePositions).forEach(pagePosition => {
      if (pagePosition[0] === routeName) {
        pagePosition[1] = scrollTop;
      } else {
        newPagePositions[routeName] = scrollTop;
      }
    });
  }
  globalState.pagePositions = newPagePositions;
};
