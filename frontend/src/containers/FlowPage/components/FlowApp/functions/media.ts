import * as THREE from 'three';

import { FlowItemRef } from 'containers/FlowPage/components/FlowApp/FlowApp';

import { appObj, App } from './app';
import fragmentShader from './shaders/media/fragment.glsl';
import vertexShader from './shaders/media/vertex.glsl';

export interface MediaItem {
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  update: (y: unknown) => unknown;
  onResize: () => void;
}

export const media = (flowItem: FlowItemRef): MediaItem => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const element: HTMLDivElement = flowItem.refEl;
  let bounds: DOMRect = element.getBoundingClientRect();
  let mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  let geometry: THREE.PlaneBufferGeometry;

  const createGeometry = () => {
    geometry = new THREE.PlaneBufferGeometry();
  };

  const createMesh = (flowItem: FlowItemRef) => {
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
    bounds = element.getBoundingClientRect();

    updateScale();
    updateX();
    updateY();

    mesh.material.uniforms.uPlaneSizes.value = [mesh.scale.x, mesh.scale.y];
  };

  const updateScale = () => {
    mesh.scale.x = (appObj.sizes.width * bounds.width) / appObj.sizes.width;
    mesh.scale.y = (appObj.sizes.height * bounds.height) / appObj.sizes.height;
  };

  const updateX = (x = 0) => {
    mesh.position.x =
      -(appObj.sizes.width / 2) +
      mesh.scale.x / 2 +
      ((bounds.left + x) / appObj.sizes.width) * appObj.sizes.width;
  };

  const updateY = (y = 0) => {
    mesh.position.y =
      appObj.sizes.height / 2 -
      mesh.scale.y / 2 -
      ((bounds.top + y) / appObj.sizes.height) * appObj.sizes.height;
  };

  const update = scrollObj => {
    const { currentY, lastY } = scrollObj;

    updateScale();
    updateX();
    updateY(currentY);

    const planeOffset = mesh.scale.y / 2;
    const viewportOffset = appObj.sizes.height / 2;

    mesh.material.uniforms.uStrength.value =
      ((currentY - lastY) / appObj.sizes.width) * 10;
  };

  const onResize = () => {
    mesh.material.uniforms.uViewportSizes.value = [
      appObj.sizes.width,
      appObj.sizes.height,
    ];

    createBounds();
  };

  // const setPlanesPosition = (imagePlaneObjects: ImagePlaneObject[]) => {
  //   imagePlaneObjects.forEach(imagePlane => {
  //     const { top, left, height, width } = imagePlane.bounds;
  //     const { sizes } = appObj;
  //     imagePlane.threejs.position.y = -0 + -top + sizes.height / 2 - height / 2;
  //     imagePlane.threejs.position.x = left - sizes.width / 2 + width / 2;
  //   });
  // };

  // const update = () => {
  //   setPlanesPosition(imagePlaneObjects);
  // };

  // const destroy = () => {
  //   imagePlaneObjects = [];
  // };

  // const init = () => {
  //   generatePlanes(appProps.flowItemsArray);
  // };

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
