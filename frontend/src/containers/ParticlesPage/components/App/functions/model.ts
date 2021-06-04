import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler';

import { UpdateInfo } from './app';
import vertexShader from './shaders/dots/vertex.glsl';
import fragmentShader from './shaders/dots/fragment.glsl';
import { getRandBetween } from './utils/getRandBetween';

interface Model {
  modelSrc: string;
  loader: GLTFLoader;
}

export const model = ({ loader, modelSrc }: Model) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  let mesh;
  let particlesGeometry;
  const particlesMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uSize: { value: 3 },
      uTime: { value: 0 },
    },
  });
  let particles;

  const generateModel = () => {
    loader.load(modelSrc, res => {
      mesh = res.scene.children[0];
      updateParticlesGeometry();
      particles = new THREE.Points(particlesGeometry, particlesMaterial);
      add();
    });
  };

  const updateParticlesGeometry = () => {
    const sampler = new MeshSurfaceSampler(mesh).build();
    const count = 10000;
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

  const init = () => {
    generateModel();
  };
  init();

  const add = () => {
    container.add(particles);
  };

  const remove = () => {
    container.remove(particles);
  };

  const update = (updateInfo: UpdateInfo) => {
    particlesMaterial.uniforms.uTime.value = updateInfo.time / 1000;
  };

  return {
    container,
    update,
  };
};
