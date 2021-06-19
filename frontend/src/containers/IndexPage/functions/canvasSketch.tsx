import { AppObj } from './app';
import { UpdateInfo } from './app';

interface CanvasSketch {
  appObj: AppObj;
}

export interface CanvasSketchReturn {
  update: (updateInfo: UpdateInfo) => void;
}

export const canvasSketch = ({ appObj }: CanvasSketch): CanvasSketchReturn => {
  const init = () => {
    const { ctx } = appObj;

    // //Rectangle
    // ctx.fillStyle = 'green';
    // ctx.fillRect(100, 100, 100, 100);
    // ctx.fillStyle = 'yellow';
    // ctx.fillRect(300, 100, 100, 100);

    // //Line
    // ctx.beginPath();
    // ctx.moveTo(50, 300);
    // ctx.lineTo(300, 100);
    // ctx.lineTo(400, 300);
    // ctx.strokeStyle = 'red';
    // ctx.stroke();

    // //Arc /

    // ctx.beginPath();
    // ctx.arc(300, 300, 30, 0, Math.PI * 2, false);
    // ctx.strokeStyle = 'blue';
    // ctx.stroke();

    // //For loop

    // for (let i = 0; i < 4; i++) {
    //   ctx.beginPath();
    //   ctx.arc(i * 100, i * 100, i * 30, 0, Math.PI * 2, false);
    //   ctx.strokeStyle = 'blue';
    //   ctx.stroke();
    // }
  };

  const circle = () => {
    const { ctx } = appObj;

    const radius = Math.random() * 30 + 5;
    let x = Math.random() * (appObj.viewportSizes.width - radius * 2) + radius;
    let y = Math.random() * (appObj.viewportSizes.height - radius * 2) + radius;
    let dx = Math.random() + 0.2;
    let dy = Math.random() + 0.2;

    const draw = () => {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2, false);
      ctx.strokeStyle = 'blue';
      ctx.stroke();
    };

    const update = () => {
      draw();
      if (x + radius >= appObj.viewportSizes.width || x - radius < 0) {
        dx = -dx;
      }

      if (y + radius >= appObj.viewportSizes.height || y - radius < 0) {
        dy = -dy;
      }

      x += 8 * dx;
      y += 10 * dy;
    };

    return {
      update,
    };
  };

  const circles = [];

  for (let i = 0; i < 100; i++) {
    circles.push(circle());
  }

  const update = (updateInfo: UpdateInfo) => {
    clear();
    circles.forEach(circle => {
      circle.update();
    });
  };

  const clear = () => {
    const { ctx } = appObj;
    ctx.clearRect(
      0,
      0,
      appObj.viewportSizes.width,
      appObj.viewportSizes.height,
    );
  };

  init();

  return {
    update,
  };
};
