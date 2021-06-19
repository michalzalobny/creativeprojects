import { AppObj } from './app';

interface CanvasSketch {
  appObj: AppObj;
}

export interface CanvasSketchReturn {}

export const canvasSketch = ({ appObj }: CanvasSketch): CanvasSketchReturn => {
  const init = () => {
    appObj.ctx.fillRect(100, 100, 100, 100);
  };

  init();

  return null;
};
