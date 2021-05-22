import * as THREE from 'three';

import { PositionBulletReturn } from './bullet';

import vertexShader from './shaders/curve/vertex.glsl';
import fragmentShader from './shaders/curve/fragment.glsl';
import { UpdateInfo } from './app';

interface CurvePoints {
  p1: PositionBulletReturn;
  p2: PositionBulletReturn;
}

export interface CurveReturn {
  container: THREE.Object3D;
  generateCurve: (points: CurvePoints) => void;
  update: (updateInfo: UpdateInfo) => void;
}

const CURVE_MULTIPLIER = 0.08;
const TUBE_SEG = 10;

export const curve = (): CurveReturn => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  let mesh;

  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
    side: THREE.DoubleSide,
    uniforms: {
      uDistance: { value: 0 },
      uTime: { value: 0 },
    },
  });

  const generateCurve = ({ p1, p2 }: CurvePoints) => {
    const v1 = new THREE.Vector3(p1.x, p1.y, p1.z);
    const v2 = new THREE.Vector3(p2.x, p2.y, p2.z);
    let points = [];

    const distance = v1.distanceTo(v2);

    for (let i = 0; i <= TUBE_SEG; i++) {
      const p = new THREE.Vector3().lerpVectors(v1, v2, i / TUBE_SEG);
      p.normalize();
      p.multiplyScalar(
        1 + Math.sin((Math.PI * i) / TUBE_SEG) * CURVE_MULTIPLIER * distance,
      );
      points = points.concat(p);
    }

    const path = new THREE.CatmullRomCurve3(points);

    const geometry = new THREE.TubeGeometry(path, TUBE_SEG, 0.003, 8, false);
    mesh = new THREE.Mesh(geometry, shaderMaterial);
    container.add(mesh);

    mesh.material.uniforms.uDistance.value = distance;
  };

  const update = (updateInfo: UpdateInfo) => {
    mesh.material.uniforms.uTime.value = updateInfo.time / 1000;
  };

  return {
    container,
    generateCurve,
    update,
  };
};
