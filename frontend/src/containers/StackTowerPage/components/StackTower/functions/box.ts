import * as THREE from 'three';
import * as CANNON from 'cannon-es';

import { GameSetup } from './world';
import { AppObj } from './application';

export type Direction = 'x' | 'z';

export interface StackBox {
  threejs: THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>;
  cannonjs: CANNON.Body;
  width: number;
  depth: number;
  direction: Direction;
}

interface Box {
  gameSetup: GameSetup;
  cannonWorld: CANNON.World;
  appObj: AppObj;
}

interface AddLayerProps {
  x: number;
  z: number;
  width: number;
  depth: number;
  direction: Direction;
}

export type AddLayer = (props: AddLayerProps) => void;

export const box = ({ appObj, cannonWorld, gameSetup }: Box) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const addLayer: AddLayer = ({ x, z, width, depth, direction }) => {
    const y = gameSetup.BOX_HEIGHT * gameSetup.stack.length;

    const layer = generateBox(x, y, z, width, depth, false);
    layer.direction = direction;
    gameSetup.stack.push(layer);
  };

  const generateBox = (x, y, z, width, depth, falls): StackBox => {
    //ThreeJS
    const geometry = new THREE.BoxGeometry(width, gameSetup.BOX_HEIGHT, depth);
    const colorDepth = falls
      ? gameSetup.stack.length - 1
      : gameSetup.stack.length;

    const color = new THREE.Color(
      `hsl(${appObj.baseColor + colorDepth * appObj.colorMultiplier}, 65%,55%)`,
    );
    const material = new THREE.MeshLambertMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    container.add(mesh);

    //CannonJS
    const shape = new CANNON.Box(
      new CANNON.Vec3(width / 2, gameSetup.BOX_HEIGHT / 2, depth / 2),
    );
    const mass = falls ? 5 : 0;
    const body = new CANNON.Body({ mass, shape });
    body.position.set(x, y, z);
    cannonWorld.addBody(body);

    return {
      threejs: mesh,
      cannonjs: body,
      width,
      depth,
      direction: null,
    };
  };

  const destroyBoxes = () => {
    for (const object of gameSetup.stack) {
      container.remove(object.threejs);
      cannonWorld.removeBody(object.cannonjs);
    }

    for (const object of gameSetup.overhangs) {
      container.remove(object.threejs);
      cannonWorld.removeBody(object.cannonjs);
    }
    gameSetup.stack = [];
    gameSetup.overhangs = [];
  };

  return {
    generateBox,
    container,
    addLayer,
    destroyBoxes,
  };
};
