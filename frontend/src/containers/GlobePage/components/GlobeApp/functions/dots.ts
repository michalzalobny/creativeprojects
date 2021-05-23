import * as THREE from 'three';

import vertexShader from './shaders/dots/vertex.glsl';
import fragmentShader from './shaders/dots/fragment.glsl';
import { UpdateInfo, AppObj, App } from './app';
import mapImage from './images/siurmap.png';
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

const calcPosFromLatLonRad = (lat, lon) => {
  //https://en.wikipedia.org/wiki/Spherical_coordinate_system
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -Math.cos(theta) * Math.sin(phi);
  const z = Math.sin(phi) * Math.sin(theta);
  const y = Math.cos(phi);

  return { x, y, z };
};

const isVisible = (lat, lon, width, height, pixels) => {
  const x = Math.floor(((lon + 180) / 360) * width);
  const y = Math.floor(((lat + 90) / 180) * height);

  const pos = width * y + x;

  return pixels[pos] >= 255;
};

export const dots = ({ appObj, appProps }: Dots): DotsReturn => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  let material;
  // const dotGeometry = new THREE.CircleGeometry(2, 5);
  const geometry = new THREE.BufferGeometry();

  const generateGalaxy = () => {
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

      const pixels = new Float32Array(imageData.data.length);

      for (let i = 0; i <= pixels.length; i++) {
        pixels[i] = imageData.data[i * 4 + 3];
      }

      // for (let i = 0; i <= pixels.length; i++) {
      //   const i4 = i * 4;
      //   pixels[i4] = imageData.data[i4];
      //   pixels[i4 + 1] = imageData.data[i4 + 1];
      //   pixels[i4 + 2] = imageData.data[i4 + 2];
      //   pixels[i4 + 3] = imageData.data[i4 + 3];
      // }

      const points = new THREE.Points(geometry, material);
      container.add(points);

      const posArr = [];

      const rows = 1000;
      const DEG2RAD = Math.PI / 180;
      const GLOBE_RADIUS = 1;
      const dotDensity = 80; //30

      let dotsAmount = 0;

      for (let lat = -90; lat <= 90; lat += 180 / rows) {
        const radius = Math.cos(Math.abs(lat) * DEG2RAD) * GLOBE_RADIUS;
        const circumference = radius * Math.PI * 2;

        const dotsForLat = circumference * dotDensity;

        // console.log(dotsForLat);
        for (let x = 0; x < dotsForLat; x++) {
          const long = -180 + (x * 360) / dotsForLat; //167

          //lat, lon, width, height, pixels
          const shouldRender = isVisible(
            lat,
            long,
            imageData.width,
            imageData.height,
            pixels,
          );

          if (shouldRender) {
            const { x: latX, y, z } = calcPosFromLatLonRad(lat, long);
            posArr.push(latX, y, z);
            dotsAmount += 1;
          }

          // if (!this.visibilityForCoordinate(long, lat)) continue;

          // Setup and save circle matrix data
        }
      }

      const positions = new Float32Array(dotsAmount * 3);

      for (let i = 0; i <= posArr.length; i++) {
        const i3 = i * 3;
        positions[i3] = posArr[i3];
        positions[i3 + 1] = posArr[i3 + 1];
        positions[i3 + 2] = posArr[i3 + 2];
      }

      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3),
      );
    };

    material = new THREE.ShaderMaterial({
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 1) },
        uSize: { value: 4 },
        uTime: { value: 0 },
      },
    });
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
