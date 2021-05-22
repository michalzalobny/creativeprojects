import * as THREE from 'three';

type BulletMesh = THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;

interface BulletReturn {
  mesh: BulletMesh;
}

export const bullet = (): BulletReturn => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const geometry = new THREE.SphereBufferGeometry(0.05, 30, 30);
  let mesh: BulletMesh;
  const globeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('red'),
  });

  const generateBullet = (latitude: number, longitude: number) => {
    //https://en.wikipedia.org/wiki/Spherical_coordinate_system
    const lat = (latitude * Math.PI) / 180;
    const lng = (longitude * Math.PI) / 180;

    const x = Math.cos(lng) * Math.sin(lat);
    const y = Math.sin(lng) * Math.sin(lat);
    const z = Math.cos(lat);

    mesh = new THREE.Mesh(geometry, globeMaterial);
    mesh.position.set(x, y, z);
  };

  const init = () => {
    generateBullet(42, 51);
  };

  init();

  //update
  //onresize

  return {
    mesh,
  };
};
