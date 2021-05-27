import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

import vertexShader from './shaders/dots/vertex.glsl';
import fragmentShader from './shaders/dots/fragment.glsl';
import { UpdateInfo, AppObj, App } from './app';
import mapImage from './images/siurmap.png';
import { getRandBetween } from './utils/getRandBetween';
import { calcPosFromLatLonRad } from './utils/calcPosFromLatLonRad';
import { isPointVisible } from './utils/isPointVisible';
import { ZOOM_IN_THRESHOLD } from '../constants';

export interface DotsReturn {
  container: THREE.Object3D;
  update: (updateInfo: UpdateInfo) => void;
  destroy: () => void;
}

interface Dots {
  appObj: AppObj;
  appProps: App;
  pivot: THREE.Group;
}

export const dots = ({ pivot, appObj, appProps }: Dots): DotsReturn => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const material = new THREE.ShaderMaterial({
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 1) },
      uSize: { value: 8 },
      uTime: { value: 0 },
      uElevation: { value: 0 },
    },
  });
  const geometry = new THREE.BufferGeometry();

  let imageData: ImageData;
  const canvas = document.getElementById('canvas');
  const ctx = (canvas as HTMLCanvasElement).getContext('2d');
  const canvasImg = new Image();

  let pixels;

  let dotsElevationTween;

  const animateDotsElevation = destination => {
    if (dotsElevationTween) {
      dotsElevationTween.stop();
    }

    dotsElevationTween = new TWEEN.Tween({
      progress: material.uniforms.uElevation.value,
    })
      .to({ progress: destination }, 500)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(obj => {
        material.uniforms.uElevation.value = obj.progress;
      });

    dotsElevationTween.start();
  };

  const updatePointsMapping = () => {
    ctx.drawImage(canvasImg, 0, 0);
    imageData = ctx.getImageData(
      0,
      0,
      canvasImg.naturalWidth,
      canvasImg.naturalHeight,
    );

    pixels = new Float32Array(imageData.data.length);

    for (let i = 0; i <= pixels.length; i++) {
      pixels[i] = imageData.data[i * 4 + 3];
    }
  };

  const generatePoints = () => {
    const points = new THREE.Points(geometry, material);
    const positionsArr = [];

    const rows = 150;
    const DEG2RAD = Math.PI / 180;
    const GLOBE_RADIUS = 1;
    const dotDensity = rows / 3.5;

    for (let lat = -90; lat <= 90; lat += 180 / rows) {
      const radius = Math.cos(Math.abs(lat) * DEG2RAD) * GLOBE_RADIUS;
      const circumference = radius * Math.PI * 2;

      const dotsForLat =
        Math.floor(circumference * dotDensity) + getRandBetween(1, 2); //Used Math.floor to evenly divide spaces between dots

      for (let x = 0; x < dotsForLat; x++) {
        const long = -180 + (x * 360) / dotsForLat;

        const shouldRender = isPointVisible({
          lat,
          lon: long,
          mapHeight: imageData.height,
          mapWidth: imageData.width,
          imageDataAlphaArray: pixels,
        });

        if (shouldRender) {
          const { x, y, z } = calcPosFromLatLonRad(lat, long);
          positionsArr.push(x, y, z);
        }
      }
    }

    const positions = new Float32Array(positionsArr);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    //Generates random value for each point on the map
    const randoms = new Float32Array(positionsArr.length / 3);
    for (let i = 0; i < randoms.length; i++) {
      randoms[i] = getRandBetween(1, 50);
    }
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

    container.add(points);
    pivot.add(container);
  };

  const init = () => {
    canvasImg.src = mapImage.src;
    canvasImg.onload = () => {
      updatePointsMapping();
      generatePoints();
      setListeners();
    };
  };

  init();

  const onTouchDown = () => {
    animateDotsElevation(1);
  };

  const onTouchUp = () => {
    animateDotsElevation(0);
  };

  const setListeners = () => {
    window.addEventListener('mousedown', onTouchDown);
    window.addEventListener('mouseup', onTouchUp);

    window.addEventListener('touchstart', onTouchDown);
    window.addEventListener('touchend', onTouchUp);
  };

  const destroyListeners = () => {
    window.removeEventListener('mousedown', onTouchDown);
    window.removeEventListener('mouseup', onTouchUp);

    window.removeEventListener('touchstart', onTouchDown);
    window.removeEventListener('touchend', onTouchUp);
  };

  const update = (updateInfo: UpdateInfo) => {
    material.uniforms.uTime.value = updateInfo.time / 1000;
  };

  const destroy = () => {
    destroyListeners();
  };

  return {
    container,
    update,
    destroy,
  };
};
