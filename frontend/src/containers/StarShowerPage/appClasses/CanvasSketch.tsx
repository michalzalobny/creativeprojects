import { MouseMove } from './MouseMove/MouseMove';
import { Event } from 'three';
import { AppObj, UpdateInfo } from './App';
import { getRandBetween } from './utils/getRandBetween';

interface CanvasSketch {
  appObj: AppObj;
}

export interface CanvasSketchReturn {
  update: (updateInfo: UpdateInfo) => void;
  destroy: () => void;
}

const MAX_RADIUS = 90;
const MOUSE_THRESHOLD = 100;

export const canvasSketch = ({ appObj }: CanvasSketch): CanvasSketchReturn => {
  const mouseMove = MouseMove.getInstance();

  let _x = 0;
  let _y = 0;

  mouseMove.addEventListener('mousemoved', (e: Event) => {
    _x = (e.target as MouseMove).mouseLerp.x;
    _y = (e.target as MouseMove).mouseLerp.y;
  });

  let circles = [];
  const colorArray = ['#ffaa33', '#99ffaa', '#4411aa', '#ff1100'];

  const circle = () => {
    const { ctx } = appObj;

    let radius = getRandBetween(1, 8);
    const minRadius = radius;
    let x = Math.random() * (appObj.viewportSizes.width - radius * 2) + radius;
    let y = Math.random() * (appObj.viewportSizes.height - radius * 2) + radius;
    let dx = (Math.random() + 0.2) * (Math.random() - 0.5);
    let dy = (Math.random() + 0.2) * (Math.random() - 0.5);

    const color = colorArray[getRandBetween(0, colorArray.length)];

    const draw = () => {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2, false);

      ctx.fillStyle = color;
      ctx.fill();
    };

    const update = () => {
      draw();
      if (x + radius >= appObj.viewportSizes.width || x - radius < 0) {
        dx = -dx;
      }

      if (y + radius >= appObj.viewportSizes.height || y - radius < 0) {
        dy = -dy;
      }

      x += 3 * dx;
      y += 2 * dy;

      //interactivity

      const mouseX = _x;
      const mouseY = _y;

      if (
        appObj.mouseMove.isInit &&
        mouseX - x < MOUSE_THRESHOLD &&
        mouseX - x > -MOUSE_THRESHOLD &&
        mouseY - y < MOUSE_THRESHOLD &&
        mouseY - y > -MOUSE_THRESHOLD
      ) {
        if (radius < MAX_RADIUS) {
          radius += 1;
        }
      } else if (radius > minRadius) {
        radius -= 1;
      }
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

  const setCircles = () => {
    circles = [];

    for (let i = 0; i < 800; i++) {
      circles.push(circle());
    }
  };

  const init = () => {
    addEventListeners();
    setCircles();
  };

  const onResize = () => {
    setCircles();
  };

  const addEventListeners = () => {
    window.addEventListener('resize', onResize);
  };
  const removeEventListeners = () => {
    window.removeEventListener('resize', onResize);
  };

  const destroy = () => {
    removeEventListeners();
  };

  init();

  return {
    update,
    destroy,
  };
};
