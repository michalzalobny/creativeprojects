import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

import { AppObj } from './app';
import fragmentShader from './shaders/mediaSlide/fragment.glsl';
import vertexShader from './shaders/mediaSlide/vertex.glsl';
import { ImageMediaProps } from 'utils/types/Media';

export interface MediaItem {
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  update: () => unknown;
  onResize: () => void;
}

type ImageEl = {
  refEl: HTMLDivElement;
  image: ImageMediaProps;
};

export const mediaSlide = (
  imageEl: ImageEl,
  geometry: THREE.PlaneBufferGeometry,
  appObj: AppObj,
  updateLoadStatus: () => void,
): MediaItem => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const element: HTMLDivElement = imageEl.refEl;
  let bounds: DOMRect = element.getBoundingClientRect();
  let mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;

  let isBefore;
  let isAfter;
  let extra = 0;
  const parentEl = imageEl.refEl.parentElement;

  const createMesh = (imageEl: ImageEl) => {
    const imageSrc = imageEl.image.formats
      ? imageEl.image.formats.large?.url ||
        imageEl.image.formats.medium?.url ||
        imageEl.image.formats.small?.url ||
        imageEl.image.formats.thumbnail.url
      : imageEl.image.url;

    const image = new Image();
    const texture = new THREE.Texture();
    image.src = imageSrc;
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      texture.image = image;
      texture.needsUpdate = true;
      material.uniforms.uImageSizes.value = [
        image.naturalWidth,
        image.naturalHeight,
      ];
      updateLoadStatus();
      animateImage();
    };

    const material = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.DoubleSide,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uViewportSizes: {
          value: [appObj.viewportSizes.width, appObj.viewportSizes.height],
        },
        uStrength: { value: 0 },
        uOpacity: { value: 0 },
      },
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
    });

    mesh = new THREE.Mesh(geometry, material);
    container.add(mesh);
  };

  const animateImage = () => {
    const tweenProgress = new TWEEN.Tween({
      progress: mesh.material.uniforms.uOpacity.value,
    })
      .to({ progress: 1 }, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(obj => {
        mesh.material.uniforms.uOpacity.value = obj.progress;
      });

    tweenProgress.start();
  };

  const createBounds = () => {
    const { currentY, currentX } = appObj.scroll.scrollObj;
    bounds = element.getBoundingClientRect();

    updateScale();
    updateX(currentX);
    updateY(currentY);

    mesh.material.uniforms.uPlaneSizes.value = [mesh.scale.x, mesh.scale.y];
  };

  const updateScale = () => {
    mesh.scale.x = bounds.width;
    mesh.scale.y = bounds.height;
  };

  const updateX = (x = 0) => {
    mesh.position.x =
      -x +
      bounds.left -
      appObj.viewportSizes.width / 2 +
      mesh.scale.x / 2 -
      extra;
  };

  const updateY = (y = 0) => {
    mesh.position.y =
      -y - bounds.top + appObj.viewportSizes.height / 2 - mesh.scale.y / 2;
  };

  const update = () => {
    const { currentY } = appObj.scroll.scrollObj;

    const { currentX, currentStrengthX } = appObj.sideScroll.scrollObj;

    updateScale();
    updateX(currentX);
    updateY(currentY);

    const strength = currentStrengthX / appObj.viewportSizes.height;
    mesh.material.uniforms.uStrength.value = strength * -20;

    isBefore =
      mesh.position.x + mesh.scale.x / 2 < -appObj.viewportSizes.width / 2;
    isAfter =
      mesh.position.x - mesh.scale.x / 2 > appObj.viewportSizes.width / 2;

    if (appObj.sideScroll.scrollObj.direction === 'down' && isBefore) {
      extra -= parentEl.clientWidth; //add/remove whole slider container width

      isBefore = false;
      isAfter = false;
    }

    if (appObj.sideScroll.scrollObj.direction === 'up' && isAfter) {
      extra += parentEl.clientWidth; //add/remove whole slider container width

      isBefore = false;
      isAfter = false;
    }
  };

  const onResize = () => {
    extra = 0;
    createBounds();
    mesh.material.uniforms.uViewportSizes.value = [
      appObj.viewportSizes.width,
      appObj.viewportSizes.height,
    ];
  };

  const init = () => {
    createMesh(imageEl);
    createBounds();
    onResize();
  };

  init();

  return {
    mesh,
    update,
    onResize,
  };
};
