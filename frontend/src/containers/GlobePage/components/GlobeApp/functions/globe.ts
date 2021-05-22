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

  const points = [
    [50, 30],
    [53.9, 1.5],
    [23.54, 102.55],
    [-23, 102],
  ];

  const generateBullets = () => {
    points.forEach(point => {
      const { mesh, positionBullet } = bullet();
      positionBullet({ latitude: point[0], longitude: point[1] });
      container.add(mesh);
    });
  };

  return {
    container,
    init,
  };
};
