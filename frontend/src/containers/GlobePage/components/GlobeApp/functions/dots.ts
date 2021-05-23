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

const calcPosFromLatLonRad = (lat, lon) => {
  //https://en.wikipedia.org/wiki/Spherical_coordinate_system
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -Math.cos(theta) * Math.sin(phi);
  const z = Math.sin(phi) * Math.sin(theta);
  const y = Math.cos(phi);

  return { x, y, z };
};

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

        // if (pixels[finalPos + 3] !== 0) {
        //   const i3 = lat * 3;
        //   positions[i3] = vector.x;
        //   positions[i3 + 1] = vector.y;
        //   positions[i3 + 2] = vector.z;
        // }

        // geometry.setAttribute(
        //   'position',
        //   new THREE.BufferAttribute(positions, 3),
        // );
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
        uSize: { value: 5 },
        uTime: { value: 0 },
      },
    });

    const points = new THREE.Points(geometry, material);
    container.add(points);

    const posArr = [];

    const rows = 100;
    const DEG2RAD = Math.PI / 180;
    const GLOBE_RADIUS = 1;
    const dotDensity = 30; //30

    let dotsAmount = 0;

    for (let lat = -90; lat <= 90; lat += 180 / rows) {
      const radius = Math.cos(Math.abs(lat) * DEG2RAD) * GLOBE_RADIUS;
      const circumference = radius * Math.PI * 2;

      const dotsForLat = circumference * dotDensity;

      // console.log(dotsForLat);
      for (let x = 0; x < dotsForLat; x++) {
        const long = -180 + (x * 360) / dotsForLat; //167

        const { x: latX, y, z } = calcPosFromLatLonRad(lat, long);
        dotsAmount += 1;

        posArr.push(latX, y, z);

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

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
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
