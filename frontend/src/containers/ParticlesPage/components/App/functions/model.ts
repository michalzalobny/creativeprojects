import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

import { UpdateInfo, AppObj, App } from './app';
import vertexShader from './shaders/dots/vertex.glsl';
import fragmentShader from './shaders/dots/fragment.glsl';
import { getRandBetween } from './utils/getRandBetween';

import mask from './images/mask.jpg';

interface Model {
  appObj: AppObj;
  appProps: App;
}

export const model = ({ appProps, appObj }: Model) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const amount = 440;

  const textureLoader = new THREE.TextureLoader();
  const textures = [
    textureLoader.load(appProps.creativeItems[0].image.url),
    textureLoader.load(appProps.creativeItems[1].image.url),
    textureLoader.load(mask.src),
  ];

  let particlesGeometry;
  const particlesMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uSize: { value: 0.9 },
      uTime: { value: 0 },
      t1: { value: textures[0] },
      t2: { value: textures[1] },
      mask: { value: textures[2] },
      uAmount: { value: amount },
      uMouse3D: { value: new THREE.Vector3(0) },
      uTransitionProgress: { value: 0 },
      uScrollY: { value: appObj.scroll.scrollObj.currentY },
      uCameraZ: { value: appObj.camera.position.z },
      uScreenWidth: { value: appObj.viewportSizes.width },
      uScreenHeight: { value: appObj.viewportSizes.height },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    },
  });
  let particles;

  const generateModel = () => {
    updateParticlesGeometry();
    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    appObj.scene.add(particles);
  };

  const updateParticlesGeometry = () => {
    particlesGeometry = new THREE.BufferGeometry();
    const count = amount * amount;

    const particlePositions = new Float32Array(count * 3);
    const randomArray = new Float32Array(count);
    const pressArray = new Float32Array(count);
    const directionArray = new Float32Array(count);
    const coordinates = new Float32Array(count * 3);
    const speedArray = new Float32Array(count);
    const offsetArray = new Float32Array(count);

    let num = 0;
    for (let i = 0; i < amount; i++) {
      for (let j = 0; j < amount; j++) {
        particlePositions[num * 3 + 0] = i - amount / 2; // c/2 used to center
        particlePositions[num * 3 + 1] = j - amount / 2;
        particlePositions[num * 3 + 2] = 0;

        coordinates[num * 3 + 0] = i;
        coordinates[num * 3 + 1] = j;
        coordinates[num * 3 + 2] = 0;

        directionArray[num] = Math.random() > 0.5 ? 1 : -1;
        offsetArray[num] = getRandBetween(-1000, 1000);
        speedArray[num] = getRandBetween(-100, 100);
        pressArray[num] = 2;

        num++;
      }
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3),
    );

    particlesGeometry.setAttribute(
      'aCoordinates',
      new THREE.BufferAttribute(coordinates, 3),
    );

    particlesGeometry.setAttribute(
      'aRandom',
      new THREE.BufferAttribute(randomArray, 1),
    );

    particlesGeometry.setAttribute(
      'aDirection',
      new THREE.BufferAttribute(directionArray, 1),
    );

    particlesGeometry.setAttribute(
      'aPress',
      new THREE.BufferAttribute(pressArray, 1),
    );

    particlesGeometry.setAttribute(
      'aSpeed',
      new THREE.BufferAttribute(speedArray, 1),
    );

    particlesGeometry.setAttribute(
      'aOffset',
      new THREE.BufferAttribute(offsetArray, 1),
    );
  };

  let tweenTP;

  const animateTP = (destination: number) => {
    if (tweenTP) {
      tweenTP.stop();
    }

    tweenTP = new TWEEN.Tween({
      progress: particlesMaterial.uniforms.uTransitionProgress.value,
    })
      .to({ progress: destination }, 800)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(obj => {
        particlesMaterial.uniforms.uTransitionProgress.value = obj.progress;
      });

    tweenTP.start();
  };

  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  const handleMouseMove = event => {
    mouse.x = (event.clientX / appObj.viewportSizes.width) * 2 - 1;
    mouse.y = -(event.clientY / appObj.viewportSizes.height) * 2 + 1;
  };

  let tp = 0;
  const setListeners = () => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('pointerdown', () => {
      animateTP(tp === 0 ? 1 : 0);
      tp === 0 ? (tp = 1) : (tp = 0);
    });
  };

  const update = (updateInfo: UpdateInfo) => {
    particlesMaterial.uniforms.uTime.value = updateInfo.time / 1000;
    particlesMaterial.uniforms.uScrollY.value =
      appObj.scroll.scrollObj.currentY;

    particlesMaterial.uniforms.uScreenHeight.value =
      appObj.viewportSizes.height;

    particlesMaterial.uniforms.uScreenWidth.value = appObj.viewportSizes.width;

    //Set mouse raycaster
    raycaster.setFromCamera(mouse, appObj.camera);
    const test = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(2000, 2000),
      new THREE.MeshBasicMaterial(),
    );
    const intersects = raycaster.intersectObjects([test]);
    particlesMaterial.uniforms.uMouse3D.value = intersects[0].point;
  };

  const init = () => {
    generateModel();
    setListeners();
  };
  init();

  return {
    container,
    update,
  };
};
