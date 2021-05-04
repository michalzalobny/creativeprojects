import * as THREE from 'three';

import { FlowItemRef } from 'containers/FlowPage/components/FlowApp/FlowApp';

import { appObj } from './application';

interface ImagePlane {
  item: FlowItemRef;
  threejs: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  bounds: DOMRect;
}

export const imagePlane = () => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const imagePlanes: ImagePlane[] = [];

  const generatePlaneImage = (flowItem: FlowItemRef): ImagePlane => {
    const bounds = flowItem.refEl.getBoundingClientRect();
    const geometry = new THREE.PlaneBufferGeometry(
      bounds.width,
      bounds.height,
      1,
      1,
    );
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color('red'),
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
      setPlanePosition(imagePlane);
    });
  };

  const setPlanePosition = (imagePlane: ImagePlane) => {
    const { top, left, height, width } = imagePlane.bounds;
    const { sizes } = appObj;
    imagePlane.threejs.position.y = top + sizes.height / 2 - height / 2;
    imagePlane.threejs.position.x = left - sizes.width / 2 + width / 2;
  };

  return {
    container,
    generatePlanes,
  };
};
