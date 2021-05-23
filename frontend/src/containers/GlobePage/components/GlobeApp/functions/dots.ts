import * as THREE from 'three';

import vertexShader from './shaders/dots/vertex.glsl';
import fragmentShader from './shaders/dots/fragment.glsl';
import { UpdateInfo, AppObj, App } from './app';
import mapImage from './images/testmap.png';
import myMap from './images/mymap.png';

export interface DotsReturn {
  container: THREE.Object3D;
  update: (updateInfo: UpdateInfo) => void;
}

interface Dots {
  appObj: AppObj;
  appProps: App;
}

let DOT_COUNT;

export const dots = ({ appObj, appProps }: Dots): DotsReturn => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  let material;
  // const dotGeometry = new THREE.CircleGeometry(2, 5);
  const geometry = new THREE.BufferGeometry();

  const generateGalaxy = () => {
    const vector = new THREE.Vector3();

    let imageData: ImageData;
    const canvas = document.getElementById('canvas');
    const ctx = (canvas as HTMLCanvasElement).getContext('2d');
    const canvasImg = new Image();
    canvasImg.src = mapImage.src;
    canvasImg.onload = () => {
      ctx.drawImage(canvasImg, 0, 0);
      imageData = ctx.getImageData(
        0,
        0,
        canvasImg.naturalWidth,
        canvasImg.naturalHeight,
      );

      DOT_COUNT = imageData.width * imageData.height;
      const positions = new Float32Array(DOT_COUNT * 3);
      const pixels = new Float32Array(DOT_COUNT * 4);

      for (let i = 0; i <= pixels.length; i++) {
        const i4 = i * 4;
        pixels[i4] = imageData.data[i4];
        pixels[i4 + 1] = imageData.data[i4 + 1];
        pixels[i4 + 2] = imageData.data[i4 + 2];
        pixels[i4 + 3] = imageData.data[i4 + 3];
      }

      for (let i = 1; i <= DOT_COUNT; i++) {
        const phi = Math.acos(-1 + (2 * i) / DOT_COUNT);
        const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;
        vector.setFromSphericalCoords(1, phi, theta);

        const u = 0.5 + Math.atan2(vector.x, vector.z) / (2 * Math.PI);
        const v = 0.5 - Math.asin(vector.y) / Math.PI;

        const finalPos =
          Math.floor(
            (1 - v) * imageData.width * imageData.height + u * imageData.width,
          ) * 4;

        // if (pixels[finalPos + 3] !== 0) {
        const i3 = i * 3;
        positions[i3] = vector.x;
        positions[i3 + 1] = vector.y;
        positions[i3 + 2] = vector.z;
        // }

        geometry.setAttribute(
          'position',
          new THREE.BufferAttribute(positions, 3),
        );
      }
    };

    material = new THREE.ShaderMaterial({
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 1) },
        uSize: { value: 8 },
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
