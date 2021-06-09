import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

import { UpdateInfo, AppObj, App } from './app';
import vertexShader from './shaders/mediaSlide/vertex.glsl';
import fragmentShader from './shaders/mediaSlide/fragment.glsl';
import { getRandBetween } from './utils/getRandBetween';
import { ImageMediaProps } from 'utils/types/Media';

import mask from './images/mask.jpg';

interface Model {
  appObj: AppObj;
  appProps: App;
}

const PLANE_WIDTH = 500;
const PLANE_HEIGHT = 300;
const PARTICLE_DENSITY = 0.4;

export const model = ({ appProps, appObj }: Model) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  let mesh;
  let texture;
  const geometry = new THREE.PlaneBufferGeometry(
    PLANE_WIDTH,
    PLANE_HEIGHT,
    PLANE_WIDTH * PARTICLE_DENSITY,
    PLANE_HEIGHT * PARTICLE_DENSITY,
  );

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthTest: false,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: {
      tMap: { value: texture },
      uPlaneSizes: { value: new THREE.Vector2(PLANE_WIDTH, PLANE_HEIGHT) },
      uImageSizes: { value: new THREE.Vector2(0, 0) },
      uViewportSizes: {
        value: new THREE.Vector2(
          appObj.viewportSizes.width,
          appObj.viewportSizes.height,
        ),
      },
      uTime: { value: 0 },
      uScrollY: { value: 0 },
      uMouse3D: { value: new THREE.Vector3(0, 0, 0) },
      uSpeed: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uPointSize: { value: 2.4 },
    },
    fragmentShader: fragmentShader,
    vertexShader: vertexShader,
  });

  const createMesh = (imageEl: ImageMediaProps) => {
    const imageSrc = imageEl.formats
      ? imageEl.formats.large?.url ||
        imageEl.formats.medium?.url ||
        imageEl.formats.small?.url ||
        imageEl.formats.thumbnail.url
      : imageEl.url;

    const image = new Image();
    texture = new THREE.Texture();
    image.src = imageSrc;
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      texture.image = image;
      texture.needsUpdate = true;
      material.uniforms.tMap.value = texture;
      material.uniforms.uImageSizes.value = [
        image.naturalWidth,
        image.naturalHeight,
      ];
    };

    mesh = new THREE.Points(geometry, material);
    container.add(mesh);
  };

  const createBounds = () => {
    const { currentY, currentX } = appObj.scroll.scrollObj;
    updateScale();
  };

  const updateScale = () => {
    const count = geometry.attributes.position.count;
    // mesh.scale.x = 150;
    // mesh.scale.y = 150;

    const randomArray = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      randomArray[i] = getRandBetween(-100, 100);
    }

    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randomArray, 1));
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

  let position = new THREE.Vector3(0, 0, 0);
  let nextPosition;
  let speed = 0;

  const update = (updateInfo: UpdateInfo) => {
    material.uniforms.uTime.value = updateInfo.time / 1000;
    material.uniforms.uScrollY.value = appObj.scroll.scrollObj.currentY;
    //Set mouse raycaster
    raycaster.setFromCamera(mouse, appObj.camera);
    const test = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(2000, 2000),
      new THREE.MeshBasicMaterial(),
    );
    const intersects = raycaster.intersectObjects([test]);

    nextPosition = new THREE.Vector3().lerpVectors(
      position,
      intersects[0].point,
      0.1,
    );

    speed = position.distanceTo(nextPosition);

    position = nextPosition;
    material.uniforms.uMouse3D.value = nextPosition;
    material.uniforms.uSpeed.value = speed;
  };

  const init = () => {
    createMesh(appProps.creativeItems[0].image);
    setListeners();
    createBounds();
  };
  init();

  return {
    container,
    update,
  };
};
