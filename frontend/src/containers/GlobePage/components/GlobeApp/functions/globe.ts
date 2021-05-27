import * as THREE from 'three';

import earthSrc from './images/earth.jpg';
import { bullet } from './bullet';
import { curve, CurveReturn } from './curve';
import vertexShader from './shaders/globe/vertex.glsl';
import fragmentShader from './shaders/globe/fragment.glsl';
import { UpdateInfo } from './app';

interface Globe {
  pivot: THREE.Group;
}

export const globe = ({ pivot }: Globe) => {
  const container = new THREE.Object3D();

  container.matrixAutoUpdate = false;

  const geometry = new THREE.SphereBufferGeometry(0.9, 50, 50);
  let mesh;

  const material = new THREE.MeshStandardMaterial({
    // map: new THREE.TextureLoader().load(earthSrc.src),
    color: new THREE.Color('#A7A9F5'),
  });

  const generateGlobe = () => {
    mesh = new THREE.Mesh(geometry, material);
    container.add(mesh);
    pivot.add(mesh);
  };

  const curvesArray: CurveReturn[] = [];

  const init = () => {
    generateGlobe();
    generateBullets();
  };

  const routes = [
    {
      name: 'op1',
      pointStart: [-32.834179, 22.67],
      pointFinish: [52.01, -3.67],
    },
    {
      name: 'op2',
      pointStart: [-27.537817, 142],
      pointFinish: [35, -119],
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

      container.add(bullet1.mesh, bullet2.mesh);
      pivot.add(bullet1.mesh, bullet2.mesh);

      const curve12 = curve();
      curve12.generateCurve({ p1: b1, p2: b2 });
      curvesArray.push(curve12);
      container.add(curve12.container);
      pivot.add(curve12.container);
    });
  };

  const update = (updateInfo: UpdateInfo) => {
    curvesArray.forEach(curveItem => {
      curveItem.update(updateInfo);
    });
  };

  return {
    container,
    init,
    update,
  };
};
