import { AppObj, UpdateInfo } from './app';
import { getRandBetween } from './utils/getRandBetween';

interface CanvasSketch {
  appObj: AppObj;
}

export interface CanvasSketchReturn {
  update: (updateInfo: UpdateInfo) => void;
  destroy: () => void;
}

export const canvasSketch = ({ appObj }: CanvasSketch): CanvasSketchReturn => {
  let particles = [];

  const colors = ['#d448c8', '#E8686A', '#FFC71A'];

  const particle = (x, y, radius, color) => {
    const { ctx } = appObj;

    let radians = Math.random() * Math.PI * 2;
    const velocity = 0.05;
    let xCopy = x;
    let yCopy = y;

    const draw = lastPoint => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = radius;
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(xCopy, yCopy);
      ctx.stroke();
      ctx.closePath();
    };

    const randomValue = getRandBetween(50, 120);

    const update = () => {
      const lastPoint = { x: xCopy, y: yCopy };

      const { x: mouseX, y: mouseY } = appObj.mouseMove.mouseMoveObj.mouseLerp;

      radians += velocity;
      xCopy = mouseX + Math.cos(radians) * randomValue;
      yCopy = mouseY + Math.sin(radians) * randomValue;

      draw(lastPoint);
    };

    return {
      update,
    };
  };

  const update = (updateInfo: UpdateInfo) => {
    clear();
    particles.forEach(particle => {
      particle.update();
    });
  };

  const clear = () => {
    const { ctx } = appObj;
    // ctx.clearRect(
    //   0,
    //   0,
    //   appObj.viewportSizes.width,
    //   appObj.viewportSizes.height,
    // );

    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fillRect(0, 0, appObj.viewportSizes.width, appObj.viewportSizes.height);
  };

  const setParticles = () => {
    particles = [];

    for (let i = 0; i < 50; i++) {
      const radius = getRandBetween(1, 3);
      const randomColor = getRandBetween(0, 2);
      particles.push(
        particle(
          appObj.viewportSizes.width / 2,
          appObj.viewportSizes.height / 2,
          radius,
          colors[randomColor],
        ),
      );
    }
  };

  const init = () => {
    addEventListeners();
    setParticles();
  };

  const onResize = () => {
    setParticles();
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
