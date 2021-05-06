import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

import { FlowItemRef } from '../../../FlowApp';
import { lights } from './lights';
import { box } from './box';
import { imagePlane } from './imagePlane';

interface World {
  flowItemsArray: FlowItemRef[];
  offsetX: MotionValue<number>;
  offsetY: MotionValue<number>;
  sizes: DOMRect;
}

export const world = (props: World) => {
  const { sizes, offsetY, flowItemsArray, offsetX } = props;

  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const { container: lightsContainer } = lights();

  const {
    update: updateImagePlane,
    destroy: destroyImagePlane,
    generatePlanes,
    container: imagePlaneContainer,
  } = imagePlane({ offsetX, offsetY, sizes });

  container.add(new THREE.AxesHelper());
  container.add(lightsContainer);
  // container.add(boxContainer);
  container.add(imagePlaneContainer);
  generatePlanes(flowItemsArray);

  const destroy = () => {
    destroyImagePlane();
  };

  const update = () => {
    updateImagePlane();
  };

  return {
    container,
    destroy,
    update,
  };
};
