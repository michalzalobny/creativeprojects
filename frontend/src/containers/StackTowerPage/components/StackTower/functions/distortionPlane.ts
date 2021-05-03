import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

import { AppObj, CAMERA_POS } from './application';
import fragShader from './shaders/distortionPlaneShaders/fragShader.glsl';

export type AnimateProgress = (destination: 1 | 0) => void;

interface DistortionPlane {
  appObj: AppObj;
}

export const distortionPlane = ({ appObj }: DistortionPlane) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  let tweenProgress;
  const color = '#b68aff';
  const shadow = '#9a5cff';

  let overlay;

  const generatePlane = () => {
    const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1);
    const overlayMaterial = new THREE.ShaderMaterial({
      depthWrite: false,
      uniforms: {
        uColor: { value: new THREE.Color(color) },
        uColorShadow: { value: new THREE.Color(shadow) },
        uProgress: { value: 0 },

        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;

        void main(){
          vUv = uv;
          // vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          // vec4 viewPosition = viewMatrix * modelPosition;
          // vec4 projectedPosition = projectionMatrix * viewPosition;
          // gl_Position = projectedPosition;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: fragShader,
      transparent: true,
    });
    overlay = new THREE.Mesh(overlayGeometry, overlayMaterial);
    overlay.rotation.y = Math.PI * 0.25;
    overlay.position.set(CAMERA_POS, CAMERA_POS, CAMERA_POS);
    overlay.renderOrder = 2;
    container.add(overlay);
  };

  appObj.appTime.on('tick', (slowDownFactor, time, delta) => {
    overlay.material.uniforms.uTime.value = time;
  });

  const animateProgress: AnimateProgress = destination => {
    if (!overlay) {
      return;
    }

    if (tweenProgress) {
      tweenProgress.stop();
    }

    tweenProgress = new TWEEN.Tween({
      progress: overlay.material.uniforms.uProgress.value,
    })
      .to({ progress: destination }, 800)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(obj => {
        overlay.material.uniforms.uProgress.value = obj.progress;
      });

    tweenProgress.start();
  };

  generatePlane();

  return {
    container,
    animateProgress,
  };
};
