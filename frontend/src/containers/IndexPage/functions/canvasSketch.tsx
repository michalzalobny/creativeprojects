import { AppObj, UpdateInfo } from './app';

interface CanvasSketch {
  appObj: AppObj;
}

export interface CanvasSketchReturn {
  update: (updateInfo: UpdateInfo) => void;
  destroy: () => void;
}

export const canvasSketch = ({ appObj }: CanvasSketch): CanvasSketchReturn => {
  const circles = [];

  const circle = () => {
    const { ctx } = appObj;

    const radius = Math.random() * 30 + 5;
    let x = Math.random() * (appObj.viewportSizes.width - radius * 2) + radius;
    let y = Math.random() * (appObj.viewportSizes.height - radius * 2) + radius;
    let dx = Math.random() + 0.2 * (Math.random() - 0.5);
    let dy = Math.random() + 0.2 * (Math.random() - 0.5);

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

  const init = () => {
    addEventListeners();

    for (let i = 0; i < 100; i++) {
      circles.push(circle());
    }
  };

  const addEventListeners = () => {};
  const removeEventListeners = () => {};

  const destroy = () => {
    removeEventListeners();
  };

  init();

  return {
    update,
    destroy,
  };
};
