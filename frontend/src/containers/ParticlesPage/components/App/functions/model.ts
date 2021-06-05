import * as THREE from 'three';

import { UpdateInfo, AppObj } from './app';
import vertexShader from './shaders/dots/vertex.glsl';
import fragmentShader from './shaders/dots/fragment.glsl';
import { getRandBetween } from './utils/getRandBetween';

interface Model {
  appObj: AppObj;
}

export const model = ({ appObj }: Model) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  let particlesGeometry;
  const particlesMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uSize: { value: 500 },
      uTime: { value: 0 },
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
    const c = 512;
    const count = c * c;

    const particlePositions = new Float32Array(count * 3);
    const randomArray = new Float32Array(count);

    let num = 0;
    for (let i = 0; i < c; i++) {
      for (let j = 0; j < c; j++) {
        particlePositions[num * 3 + 0] = i - c / 2; // c/2 used to center
        particlePositions[num * 3 + 1] = j - c / 2;
        particlePositions[num * 3 + 2] = 0;
        num++;
      }
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3),
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
