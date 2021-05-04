import * as THREE from 'three';

import { appObj } from './application';

import boxVertexShader from './shaders/box/vertex.glsl';
import boxFragmentShader from './shaders/box/fragment.glsl';
import oceanTextureSrc from './assets/1.jpg';

export const box = () => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const textureLoader = new THREE.TextureLoader();

  const generateBox = () => {
    const geometry = new THREE.PlaneBufferGeometry(2, 2, 50, 50);

    const oceanTexture = textureLoader.load(oceanTextureSrc.src);

    const material = new THREE.ShaderMaterial({
      transaprent: true,
      side: THREE.DoubleSide,
      wireframe: false,
      fragmentShader: boxFragmentShader,
      vertexShader: boxVertexShader,
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: oceanTexture },
      },
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);

    appObj.appTime.on('tick', (slowDownFactor, time, _delta) => {
      material.uniforms.uTime.value = time / 1000;
    });

    container.add(mesh);
  };

  generateBox();

  return {
    container,
  };
};
