import { AppObj } from './app';

interface CanvasSketch {
  appObj: AppObj;
}

export interface CanvasSketchReturn {}

export const canvasSketch = ({ appObj }: CanvasSketch): CanvasSketchReturn => {
  const init = () => {
    const { ctx } = appObj;

    //Rectangle
    ctx.fillStyle = 'green';
    ctx.fillRect(100, 100, 100, 100);
    ctx.fillStyle = 'yellow';
    ctx.fillRect(300, 100, 100, 100);

    //Line
    ctx.beginPath();
    ctx.moveTo(50, 300);
    ctx.lineTo(300, 100);
    ctx.lineTo(400, 300);
    ctx.strokeStyle = 'red';
    ctx.stroke();

    //Arc /

    ctx.beginPath();
    ctx.arc(300, 300, 30, 0, Math.PI * 2, false);
    ctx.strokeStyle = 'blue';
    ctx.stroke();
  };

  init();

  return null;
};
