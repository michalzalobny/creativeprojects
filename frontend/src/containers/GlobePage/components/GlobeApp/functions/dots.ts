import * as THREE from 'three';

import vertexShader from './shaders/dots/vertex.glsl';
import fragmentShader from './shaders/dots/fragment.glsl';
import { UpdateInfo, AppObj } from './app';

export interface DotsReturn {
  container: THREE.Object3D;
  update: (updateInfo: UpdateInfo) => void;
}

interface Dots {
  appObj: AppObj;
}

const DOT_COUNT = 6000;

export const dots = ({ appObj }: Dots): DotsReturn => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  let material;
  // const dotGeometry = new THREE.CircleGeometry(2, 5);
  const geometry = new THREE.BufferGeometry();

  const generateGalaxy = () => {
    const positions = new Float32Array(DOT_COUNT * 3);

    const vector = new THREE.Vector3();

    for (let i = 0; i < DOT_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / DOT_COUNT);
      const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;
      vector.setFromSphericalCoords(1.08, phi, theta);

      const i3 = i * 3;

      positions[i3] = vector.x;
      positions[i3 + 1] = vector.y;
      positions[i3 + 2] = vector.z;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    material = new THREE.ShaderMaterial({
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 1) },
        uSize: { value: 30 },
        uTime: { value: 0 },
      },
    });

    const points = new THREE.Points(geometry, material);
    container.add(points);
  };

  generateGalaxy();

  const update = (updateInfo: UpdateInfo) => {
    // material.uniforms.uTime.value = updateInfo.time / 1000;
  };

  return {
    container,
    update,
  };
};
