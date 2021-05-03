import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

// import firefliesVertexShader from './shaders/fireflies/vertexShader.glsl';
// import firefliesFragmentShader from './shaders/fireflies/fragShader.glsl';

import { AppObj } from './application';
import { GameSetup } from './world';

interface GenerateParticlesProps {
  y: number;
  count: number;
}

export type GenerateParticles = (props: GenerateParticlesProps) => Particle;

interface ParticlesProps {
  appObj: AppObj;
  gameSetup: GameSetup;
}

export interface Particle {
  threejs: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>;
}

export const particles = ({ appObj, gameSetup }: ParticlesProps) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const generateParticles = ({
    y,
    count,
  }: GenerateParticlesProps): Particle => {
    const RANDOM_SIZE = 6;

    const firefliesGeometry = new THREE.BufferGeometry();

    const positionArray = new Float32Array(count * 3);
    const scaleArray = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positionArray[i * 3 + 0] = (Math.random() - 0.5) * RANDOM_SIZE;
      positionArray[i * 3 + 1] = y;
      positionArray[i * 3 + 2] = (Math.random() - 0.5) * RANDOM_SIZE;
      scaleArray[i] = Math.random();
    }

    firefliesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positionArray, 3),
    );

    // Material
    const firefliesMaterial = new THREE.ShaderMaterial({
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      transparent: true,
      uniforms: {
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 1) },
        uSize: { value: 120 },
        uTime: { value: 0 },
        uScale: { value: 0 },
      },
      vertexShader: `uniform float uPixelRatio;
      uniform float uSize;
      uniform float uTime;
      uniform float uScale;
      
      attribute float aScale;
      
      void main()
      {
           vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          modelPosition.y += sin(uTime * 0.35 + modelPosition.x * 100.0) * aScale * 0.3;
          modelPosition.x += cos(uTime * 0.35 + modelPosition.x * 100.0) * aScale * 0.3;
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectionPosition = projectionMatrix * viewPosition;
      
          gl_Position = projectionPosition;
          
          gl_PointSize = uSize * aScale * uPixelRatio * uScale * abs(sin(uTime * aScale));
          gl_PointSize *= (1.0 / - viewPosition.z);
      }`,
      fragmentShader: `void main()
      {
        float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float strength = 0.05 / distanceToCenter - 0.1;
          gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
      }`,
    });

    firefliesGeometry.setAttribute(
      'aScale',
      new THREE.BufferAttribute(scaleArray, 1),
    );

    // Points
    const fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial);

    fireflies.renderOrder = 1;

    container.add(fireflies);

    const tweenProgress = new TWEEN.Tween({
      progress: fireflies.material.uniforms.uScale.value,
    })
      .to({ progress: 1 }, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(obj => {
        fireflies.material.uniforms.uScale.value = obj.progress;
      });

    tweenProgress.start();

    appObj.appTime.on('tick', (slowDownFactor, time, delta) => {
      firefliesMaterial.uniforms.uTime.value = time / 700;
    });

    return {
      threejs: fireflies,
    };
  };

  const clearParticles = () => {
    for (const object of gameSetup.particles) {
      container.remove(object.threejs);
    }

    gameSetup.particles = [];
  };

  const onResize = () => {
    for (const object of gameSetup.particles) {
      object.threejs.material.uniforms.uPixelRatio.value = Math.min(
        window.devicePixelRatio,
        1,
      );
    }
  };

  window.addEventListener('resize', onResize);

  const destroy = () => {
    window.removeEventListener('resize', onResize);
  };

  return {
    container,
    destroy,
    generateParticles,
    clearParticles,
  };
};
