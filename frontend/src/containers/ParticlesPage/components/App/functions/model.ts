import * as THREE from 'three';

import { UpdateInfo, AppObj } from './app';
import vertexShader from './shaders/dots/vertex.glsl';
import fragmentShader from './shaders/dots/fragment.glsl';
import { getRandBetween } from './utils/getRandBetween';

import mask from './images/mask.jpg';
import t1 from './images/t1.jpg';
import t2 from './images/t2.jpg';

interface Model {
  appObj: AppObj;
}

export const model = ({ appObj }: Model) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const amount = 128;

  const textureLoader = new THREE.TextureLoader();
  const textures = [
    textureLoader.load(t1.src),
    textureLoader.load(t2.src),
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
      uSize: { value: 800 },
      uTime: { value: 0 },
      t1: { value: textures[0] },
      t2: { value: textures[1] },
      mask: { value: textures[2] },
      uAmount: { value: amount },
      uMouse3D: { value: new THREE.Vector3(0) },
    },
  });
  let particles;

  const generateModel = () => {
    updateParticlesGeometry();
    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    container.add(particles);
  };

  const updateParticlesGeometry = () => {
    particlesGeometry = new THREE.BufferGeometry();
    const count = amount * amount;

    const particlePositions = new Float32Array(count * 3);
    const randomArray = new Float32Array(count);
    const coordinates = new Float32Array(count * 3);

    let num = 0;
    for (let i = 0; i < amount; i++) {
      for (let j = 0; j < amount; j++) {
        particlePositions[num * 3 + 0] = i - amount / 2; // c/2 used to center
        particlePositions[num * 3 + 1] = j - amount / 2;
        particlePositions[num * 3 + 2] = 0;

        coordinates[num * 3 + 0] = i;
        coordinates[num * 3 + 1] = j;
        coordinates[num * 3 + 2] = 0;

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
  };

  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  const handleMouseMove = event => {
    mouse.x = (event.clientX / appObj.viewportSizes.width) * 2 - 1;
    mouse.y = -(event.clientY / appObj.viewportSizes.height) * 2 + 1;
  };

  const setListeners = () => {
    window.addEventListener('mousemove', handleMouseMove);
  };

  const update = (updateInfo: UpdateInfo) => {
    particlesMaterial.uniforms.uTime.value = updateInfo.time / 1000;

    raycaster.setFromCamera(mouse, appObj.camera);

    const intersects = raycaster.intersectObjects(appObj.scene.children);

    for (let i = 0; i < intersects.length; i++) {
      if (intersects[i].object['in'] === 'in') {
        particlesMaterial.uniforms.uMouse3D.value = intersects[i].point;
      }
    }
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
