import { ScrollMotionValues } from 'framer-motion';

interface GlobalState {
  pagePositions: Record<string, number>;
  scrollValues: ScrollMotionValues;
  pageWrapper: React.MutableRefObject<HTMLDivElement>;
}

export const globalState: GlobalState = {
  pagePositions: {},
  scrollValues: null,
  pageWrapper: null,
};
