import * as THREE from 'three';

import { calcPosFromLatLonRad } from './utils/calcPosFromLatLonRad';

type BulletMesh = THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;

interface BulletReturn {
  mesh: BulletMesh;
  positionBullet: (coords: Coords) => PositionBulletReturn;
}

interface Coords {
  latitude: number;
  longitude: number;
}

export interface PositionBulletReturn {
  x: number;
  y: number;
  z: number;
}

export const bullet = (): BulletReturn => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const geometry = new THREE.SphereBufferGeometry(0.02, 30, 30);

  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color('white'),
  });

  const mesh = new THREE.Mesh(geometry, material);

  const positionBullet = ({
    latitude,
    longitude,
  }: Coords): PositionBulletReturn => {
    const { x, y, z } = calcPosFromLatLonRad(latitude, longitude);
    mesh.position.set(x, y, z);
    return { x, y, z };
  };

  //update
  //onresize

  return {
    mesh,
    positionBullet,
  };
};
