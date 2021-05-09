import * as THREE from 'three';

import { FlowItemRef } from 'containers/FlowPage/components/FlowApp/FlowApp';

import { appObj, App } from './app';

interface ImagePlaneObject {
  item: FlowItemRef;
  threejs: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  bounds: DOMRect;
}

interface ImagePlane {
  appProps: App;
}

export const imagePlane = ({ appProps }: ImagePlane) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  let imagePlaneObjects: ImagePlaneObject[] = [];

  const generatePlaneImage = (flowItem: FlowItemRef): ImagePlaneObject => {
    const bounds = flowItem.refEl.getBoundingClientRect();
    const geometry = new THREE.PlaneBufferGeometry(
      bounds.width,
      bounds.height,
      1,
      1,
    );

    const imageSrc = flowItem.flowItem.image.formats
      ? flowItem.flowItem.image.formats.large?.url ||
        flowItem.flowItem.image.formats.medium?.url ||
        flowItem.flowItem.image.formats.small?.url ||
        flowItem.flowItem.image.formats.thumbnail.url
      : flowItem.flowItem.image.url;

    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = 'anonymous';

    const texture = new THREE.Texture(image);
    texture.needsUpdate = true;

    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });

    const mesh = new THREE.Mesh(geometry, material);
    container.add(mesh);

    return {
      item: flowItem,
      threejs: mesh,
      bounds,
    };
  };

  const generatePlanes = (flowItems: FlowItemRef[]) => {
    flowItems.forEach(item => {
      const imagePlane = generatePlaneImage(item);
      imagePlaneObjects.push(imagePlane);
    });
  };

  const setPlanesPosition = (imagePlaneObjects: ImagePlaneObject[]) => {
    imagePlaneObjects.forEach(imagePlane => {
      const { top, left, height, width } = imagePlane.bounds;
      const { sizes } = appObj;
      imagePlane.threejs.position.y = -0 + -top + sizes.height / 2 - height / 2;
      imagePlane.threejs.position.x = left - sizes.width / 2 + width / 2;
    });
  };

  const update = () => {
    setPlanesPosition(imagePlaneObjects);
  };

  const destroy = () => {
    imagePlaneObjects = [];
  };

  const init = () => {
    generatePlanes(appProps.flowItemsArray);
  };

  return {
    container,
    init,
    destroy,
    update,
  };
};
