import * as THREE from 'three';

type BulletMesh = THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;

interface BulletReturn {
  mesh: BulletMesh;
}

export const bullet = (): BulletReturn => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const geometry = new THREE.SphereBufferGeometry(0.2, 30, 30);
  let mesh: BulletMesh;
  const globeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('red'),
  });

  const generateBullet = () => {
    mesh = new THREE.Mesh(geometry, globeMaterial);
    mesh.position.set(1 + 0.2, 0, 0);
  };

  const init = () => {
    generateBullet();
  };

  init();

  //update
  //onresize

  return {
    mesh,
  };
};
