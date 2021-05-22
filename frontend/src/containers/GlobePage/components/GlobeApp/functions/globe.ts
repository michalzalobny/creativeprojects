import * as THREE from 'three';

import earthSrc from './images/earth.jpg';
import { bullet } from './bullet';
import vertexShader from './shaders/globe/vertex.glsl';
import fragmentShader from './shaders/globe/fragment.glsl';

export const globe = () => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const geometry = new THREE.SphereBufferGeometry(1, 30, 30);
  let mesh;
  // const material = new THREE.ShaderMaterial({
  //   vertexShader: vertexShader,
  //   fragmentShader: fragmentShader,
  // });

  const material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(earthSrc.src),
  });

  const generateGlobe = () => {
    mesh = new THREE.Mesh(geometry, material);
    container.add(mesh);
  };

  const init = () => {
    generateGlobe();
    generateBullets();
  };

  const generateBullets = () => {
    const { mesh, positionBullet } = bullet();
    positionBullet({ latitude: 54.9783, longitude: 1.6178 });
    container.add(mesh);
  };

  return {
    container,
    init,
  };
};
