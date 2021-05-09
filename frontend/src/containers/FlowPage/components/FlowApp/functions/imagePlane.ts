import * as THREE from 'three';

import { FlowItemRef } from 'containers/FlowPage/components/FlowApp/FlowApp';

import { appObj, AppProps } from './application';

interface ImagePlane {
  item: FlowItemRef;
  threejs: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  bounds: DOMRect;
}

interface ImagePlaneProps {
  appProps: AppProps;
}

export const imagePlane = ({ appProps }: ImagePlaneProps) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  let imagePlanes: ImagePlane[] = [];

  const generatePlaneImage = (flowItem: FlowItemRef): ImagePlane => {
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
      imagePlanes.push(imagePlane);
    });
  };

  const setPlanesPosition = (imagePlanes: ImagePlane[]) => {
    imagePlanes.forEach(imagePlane => {
      const { top, left, height, width } = imagePlane.bounds;
      const { sizes } = appObj;
      imagePlane.threejs.position.y =
        -'appProps.offsetY.get()' + -top + sizes.height / 2 - height / 2;
      imagePlane.threejs.position.x = left - sizes.width / 2 + width / 2;
    });
  };

  const update = () => {
    setPlanesPosition(imagePlanes);
  };

  const destroy = () => {
    imagePlanes = [];
  };

  return {
    container,
    generatePlanes,
    destroy,
    update,
  };
};
