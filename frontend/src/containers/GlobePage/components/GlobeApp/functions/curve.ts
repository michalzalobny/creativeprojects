import * as THREE from 'three';

import { PositionBulletReturn } from './bullet';

import vertexShader from './shaders/curve/vertex.glsl';
import fragmentShader from './shaders/curve/fragment.glsl';

interface CurvePoints {
  p1: PositionBulletReturn;
  p2: PositionBulletReturn;
}

interface CurveReturn {
  container: THREE.Object3D;
  generateCurve: (points: CurvePoints) => void;
}

const CURVE_MULTIPLIER = 0.08;

export const curve = (): CurveReturn => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
    uniforms: {
      uDistance: { value: 0 },
    },
  });

  const generateCurve = ({ p1, p2 }: CurvePoints) => {
    const v1 = new THREE.Vector3(p1.x, p1.y, p1.z);
    const v2 = new THREE.Vector3(p2.x, p2.y, p2.z);
    let points = [];

    const distance = v1.distanceTo(v2);

    for (let i = 0; i <= 20; i++) {
      const p = new THREE.Vector3().lerpVectors(v1, v2, i / 20);
      p.normalize();
      p.multiplyScalar(
        1 + Math.sin((Math.PI * i) / 20) * CURVE_MULTIPLIER * distance,
      );
      points = points.concat(p);
    }

    const path = new THREE.CatmullRomCurve3(points);

    const geometry = new THREE.TubeGeometry(path, 20, 0.01, 8, false);
    const mesh = new THREE.Mesh(geometry, shaderMaterial);
    container.add(mesh);

    mesh.material.uniforms.uDistance.value = distance;
  };

  return {
    container,
    generateCurve,
  };
};
