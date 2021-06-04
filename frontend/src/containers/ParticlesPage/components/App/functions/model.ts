import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler';

import { UpdateInfo, AppObj } from './app';
import vertexShader from './shaders/dots/vertex.glsl';
import fragmentShader from './shaders/dots/fragment.glsl';
import { getRandBetween } from './utils/getRandBetween';

interface Model {
  modelSrc: string;
  loader: GLTFLoader;
  appObj: AppObj;
}

export const model = ({ appObj, loader, modelSrc }: Model) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  let mesh;
  let meshCopy;
  let particlesGeometry;
  const particlesMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uSize: { value: 6 },
      uTime: { value: 0 },
      uMouse3D: { value: new THREE.Vector3(0) },
    },
  });
  let particles;

  const generateModel = () => {
    loader.load(modelSrc, res => {
      mesh = res.scene.children[0];
      meshCopy = Object.create(res.scene.children[0]);
      meshCopy.in = 'in';
      const mat = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
      });
      meshCopy.material = mat;
      appObj.scene.add(meshCopy);
      updateParticlesGeometry();
      particles = new THREE.Points(particlesGeometry, particlesMaterial);
      add();
    });
  };

  const updateParticlesGeometry = () => {
    const sampler = new MeshSurfaceSampler(mesh).build();
    const count = 3000;
    particlesGeometry = new THREE.BufferGeometry();

    const positionArray = new Float32Array(count * 3);
    const randomArray = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const newPosition = new THREE.Vector3();
      sampler.sample(newPosition);

      positionArray[i * 3 + 0] = newPosition.x;
      positionArray[i * 3 + 1] = newPosition.y;
      positionArray[i * 3 + 2] = newPosition.z;
      randomArray[i] = getRandBetween(0, 10);
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positionArray, 3),
    );

    particlesGeometry.setAttribute(
      'aRandom',
      new THREE.BufferAttribute(randomArray, 1),
    );
  };

  const add = () => {
    container.add(particles);
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
      // console.log(intersects.length);
      if (intersects[i].object['in'] === 'in') {
        particlesMaterial.uniforms.uMouse3D.value = intersects[i].point;
      }

      // intersects[i].object.material.color.set(0xff0000);
    }

    // particlesMaterial.uniforms.uMouse3D.value = raycaster.ray.direction;
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
