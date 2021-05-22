import * as THREE from 'three';

import earthSrc from './images/earth.jpg';
import { bullet } from './bullet';
import { curve } from './curve';
import vertexShader from './shaders/globe/vertex.glsl';
import fragmentShader from './shaders/globe/fragment.glsl';

export const globe = () => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const geometry = new THREE.SphereBufferGeometry(1, 30, 30);
  let mesh;

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

  const routes = [
    {
      name: 'op1',
      pointStart: [50, 30],
      pointFinish: [53.9, 1.5],
    },
    {
      name: 'op2',
      pointStart: [23.54, 102.55],
      pointFinish: [-23, 102],
    },
  ];

  const generateBullets = () => {
    routes.forEach(route => {
      const bullet1 = bullet();
      const bullet2 = bullet();

      const b1 = bullet1.positionBullet({
        latitude: route.pointStart[0],
        longitude: route.pointStart[1],
      });
      const b2 = bullet2.positionBullet({
        latitude: route.pointFinish[0],
        longitude: route.pointFinish[1],
      });

      container.add(bullet1.mesh);
      container.add(bullet2.mesh);

      const { generateCurve, container: containerCurve } = curve();
      generateCurve({ p1: b1, p2: b2 });
      container.add(containerCurve);
    });
  };

  return {
    container,
    init,
  };
};
