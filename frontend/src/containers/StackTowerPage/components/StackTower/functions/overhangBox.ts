import * as THREE from 'three';

import { GameSetup } from './world';
import { StackBox } from './box';

interface AddOverhangProps {
  x: number;
  z: number;
  width: number;
  depth: number;
}

export type AddOverhang = (props: AddOverhangProps) => void;

interface OverhangBox {
  gameSetup: GameSetup;
  generateBox: (
    x: number,
    y: number,
    z: number,
    width: number,
    depth: number,
    falls: boolean,
  ) => StackBox;
}

export const overhangBox = ({ generateBox, gameSetup }: OverhangBox) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const addOverhang: AddOverhang = ({ x, z, width, depth }) => {
    const y = gameSetup.BOX_HEIGHT * (gameSetup.stack.length - 1); // Add the new box one the same layer
    const overhang = generateBox(x, y, z, width, depth, true);
    gameSetup.overhangs.push(overhang);
  };

  return {
    addOverhang,
  };
};
