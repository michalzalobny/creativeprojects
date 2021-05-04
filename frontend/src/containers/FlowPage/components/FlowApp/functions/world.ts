import * as THREE from 'three';

import { lights } from './lights';
import { box } from './box';
import { AppProps } from './application';

interface World {
  appProps: AppProps;
}

export const world = ({ appProps }: World) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const { container: lightsContainer } = lights();
  const { container: boxContainer } = box();

  container.add(new THREE.AxesHelper());
  container.add(lightsContainer);
  container.add(boxContainer);

  const destroy = () => {};

  return {
    container,
    destroy,
  };
};
