import * as THREE from 'three';

type BulletMesh = THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;

interface BulletReturn {
  mesh: BulletMesh;
  positionBullet: (coords: Coords) => void;
}

interface Coords {
  latitude: number;
  longitude: number;
}

interface PositionBulletReturn {
  x: number;
  y: number;
  z: number;
}

const calcPosFromLatLonRad = (lat, lon) => {
  //https://en.wikipedia.org/wiki/Spherical_coordinate_system
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -Math.cos(theta) * Math.sin(phi);
  const z = Math.sin(phi) * Math.sin(theta);
  const y = Math.cos(phi);

  return { x, y, z };
};

export const bullet = (): BulletReturn => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const geometry = new THREE.SphereBufferGeometry(0.02, 30, 30);

  const globeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('red'),
  });

  const mesh = new THREE.Mesh(geometry, globeMaterial);

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
