import * as THREE from 'three';

import { FlowItem } from 'containers/FlowPage/components/FlowApp/FlowApp';

import { appObj, App } from './app';
import fragmentShader from './shaders/media/fragment.glsl';
import vertexShader from './shaders/media/vertex.glsl';

export interface MediaItem {
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  update: () => unknown;
  onResize: () => void;
}

export const media = (flowItem: FlowItem): MediaItem => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const element: HTMLDivElement = flowItem.refEl;
  let bounds: DOMRect = element.getBoundingClientRect();
  let mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  let geometry: THREE.PlaneBufferGeometry;

  const createGeometry = () => {
    geometry = new THREE.PlaneBufferGeometry(1, 1, 50, 50);
  };

  const createMesh = (flowItem: FlowItem) => {
    const imageSrc = flowItem.flowItem.image.formats
      ? flowItem.flowItem.image.formats.large?.url ||
        flowItem.flowItem.image.formats.medium?.url ||
        flowItem.flowItem.image.formats.small?.url ||
        flowItem.flowItem.image.formats.thumbnail.url
      : flowItem.flowItem.image.url;

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
    };

    const material = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.DoubleSide,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uViewportSizes: { value: [appObj.sizes.width, appObj.sizes.height] },
        uStrength: { value: 0 },
      },
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
    });

    mesh = new THREE.Mesh(geometry, material);
    container.add(mesh);
  };

  const createBounds = () => {
    const { currentY, lastY, currentX, lastX } = appObj.scroll.scrollObj;
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
      -x + bounds.left - appObj.sizes.width / 2 + mesh.scale.x / 2;
  };

  const updateY = (y = 0) => {
    mesh.position.y =
      -y - bounds.top + appObj.sizes.height / 2 - mesh.scale.y / 2;
  };

  const update = () => {
    const {
      currentY,
      lastY,
      currentX,
      lastX,
      currentStrengthY,
      currentStrengthX,
      scrollMode,
    } = appObj.scroll.scrollObj;

    updateScale();
    updateX(currentX);
    updateY(currentY);

    let strength;

    if (scrollMode === 'VERTICAL') {
      strength = currentStrengthY / appObj.sizes.width;
    } else {
      strength = currentStrengthX / appObj.sizes.height;
    }

    mesh.material.uniforms.uStrength.value = strength * -25;
  };

  const onResize = () => {
    createBounds();
    mesh.material.uniforms.uViewportSizes.value = [
      appObj.sizes.width,
      appObj.sizes.height,
    ];
  };

  const init = () => {
    createGeometry();
    createMesh(flowItem);
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
