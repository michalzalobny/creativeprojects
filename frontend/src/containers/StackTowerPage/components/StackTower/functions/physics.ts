import * as CANNON from 'cannon-es';
import { AppObj } from './application';
import { DEFALUT_FPS } from './utils/AppTime';

interface Physics {
  appObj: AppObj;
}

export const physics = ({ appObj }: Physics) => {
  const cannonWorld = new CANNON.World();
  cannonWorld.gravity.set(0, -9.81, 0);
  cannonWorld.broadphase = new CANNON.NaiveBroadphase();
  cannonWorld.allowSleep = true;
  cannonWorld.defaultContactMaterial.friction = 0;
  cannonWorld.defaultContactMaterial.restitution = 0.1;

  appObj.appTime.on('tick', (slowDownFactor, _time, delta) => {
    cannonWorld.step(1 / DEFALUT_FPS, delta, slowDownFactor);
  });

  return {
    cannonWorld,
  };
};
