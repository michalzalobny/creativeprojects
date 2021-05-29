import * as THREE from 'three';

import earthSrc from './images/earth.jpg';
import { bullet } from './bullet';
import { curve, CurveReturn } from './curve';
import vertexShader from './shaders/globe/vertex.glsl';
import fragmentShader from './shaders/globe/fragment.glsl';
import vertexShaderHalo from './shaders/halo/vertex.glsl';
import fragmentShaderHalo from './shaders/halo/fragment.glsl';
import { UpdateInfo } from './app';

interface Globe {
  pivot: THREE.Group;
}

export const globe = ({ pivot }: Globe) => {
  const container = new THREE.Object3D();

  container.matrixAutoUpdate = false;

  const geometry = new THREE.SphereBufferGeometry(1, 50, 50);
  let mesh;
  let meshHalo;

  const material = new THREE.MeshStandardMaterial({
    // map: new THREE.TextureLoader().load(earthSrc.src),
    color: new THREE.Color('#A7A9F5'),
  });

  const generateGlobe = () => {
    mesh = new THREE.Mesh(geometry, material);
    container.add(mesh);
    pivot.add(mesh);
  };

  const generateGlow = () => {
    const geometry = new THREE.SphereBufferGeometry(1.02, 50, 50);
    const material = new THREE.ShaderMaterial({
      depthWrite: false,
      transparent: true,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
      },
    });
    mesh = new THREE.Mesh(geometry, material);
    // mesh.renderOrder = 2;
    // mesh.position.z = 1;
    mesh.rotation.z = 135;
    container.add(mesh);

    const geometryHalo = new THREE.CircleGeometry(1.32, 50);
    const materialHalo = new THREE.ShaderMaterial({
      depthWrite: false,
      transparent: true,
      vertexShader: vertexShaderHalo,
      fragmentShader: fragmentShaderHalo,
      uniforms: {
        uTime: { value: 0 },
      },
    });
    meshHalo = new THREE.Mesh(geometryHalo, materialHalo);
    container.add(meshHalo);
    // pivot.add(mesh);
  };

  const curvesArray: CurveReturn[] = [];

  const init = () => {
    generateGlobe();
    generateGlow();
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
