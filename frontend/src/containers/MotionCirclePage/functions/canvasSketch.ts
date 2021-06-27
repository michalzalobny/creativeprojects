import { AppObj, UpdateInfo } from './app';
import { getRandBetween } from './utils/getRandBetween';
import { Particle } from './Particle';

interface CanvasSketch {
  appObj: AppObj;
}

export interface CanvasSketchReturn {
  update: (updateInfo: UpdateInfo) => void;
  destroy: () => void;
}

export const canvasSketch = ({ appObj }: CanvasSketch): CanvasSketchReturn => {
  let particles: Particle[] = [];

  const colors = ['#d448c8', '#E8686A', '#FFC71A'];

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
        new Particle(
          appObj.viewportSizes.width / 2,
          appObj.viewportSizes.height / 2,
          radius,
          colors[randomColor],
          appObj,
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
