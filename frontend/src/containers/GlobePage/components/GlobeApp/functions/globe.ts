import * as THREE from 'three';

import { bullet } from './bullet';
import vertexShader from './shaders/globe/vertex.glsl';
import fragmentShader from './shaders/globe/fragment.glsl';

export const globe = () => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const globeGeoemetry = new THREE.SphereBufferGeometry(1, 30, 30);
  let mesh;
  const globeMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });

  const generateGlobe = () => {
    mesh = new THREE.Mesh(globeGeoemetry, globeMaterial);
    container.add(mesh);
  };

  const init = () => {
    generateGlobe();
    generateBullet();
  };

  const generateBullet = () => {
    const { mesh } = bullet();
    container.add(mesh);
  };

  return {
    container,
    init,
  };
};
