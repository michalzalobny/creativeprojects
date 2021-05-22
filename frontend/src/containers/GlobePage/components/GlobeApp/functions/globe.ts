import * as THREE from 'three';

import earthSrc from './images/earth.jpg';
import { bullet } from './bullet';
import vertexShader from './shaders/globe/vertex.glsl';
import fragmentShader from './shaders/globe/fragment.glsl';

const CURVE_MULTIPLIER = 0.05;

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

      generateCurve(b1, b2);
    });
  };

  const generateCurve = (p1, p2) => {
    const v1 = new THREE.Vector3(p1.x, p1.y, p1.z);
    const v2 = new THREE.Vector3(p2.x, p2.y, p2.z);
    let points = [];

    const distance = v1.distanceTo(v2);

    for (let i = 0; i <= 20; i++) {
      const p = new THREE.Vector3().lerpVectors(v1, v2, i / 20);
      p.normalize();
      p.multiplyScalar(
        1 +
          (Math.sin((Math.PI * i) / 20) * CURVE_MULTIPLIER * distance) /
            distance,
      );
      points = points.concat(p);
    }

    const path = new THREE.CatmullRomCurve3(points);

    const geometry = new THREE.TubeGeometry(path, 20, 0.01, 8, false);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const mesh = new THREE.Mesh(geometry, material);
    container.add(mesh);
  };

  return {
    container,
    init,
  };
};
