import * as THREE from 'three';

export const box = () => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const generateBox = () => {
    const geometry = new THREE.BoxGeometry(1, 3, 2);

    const color = new THREE.Color('red');
    const material = new THREE.MeshLambertMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);

    container.add(mesh);
  };

  generateBox();

  return {
    container,
  };
};
