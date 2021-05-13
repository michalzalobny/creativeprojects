import * as THREE from 'three';

import { FlowItem } from 'containers/FlowPage/components/FlowApp/FlowApp';

import { media, MediaItem } from './media';
import { App, AppObj } from './app';

interface ImagePlanes {
  appProps: App;
  appObj: AppObj;
}

export const imagePlanes = ({ appObj, appProps }: ImagePlanes) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  let mediaItemsArray: MediaItem[] = [];

  let geometry: THREE.PlaneBufferGeometry;

  const createGeometry = () => {
    geometry = new THREE.PlaneBufferGeometry(1, 1, 50, 50);
  };

  const generatePlanes = (flowItems: FlowItem[]) => {
    mediaItemsArray = flowItems.map(item => {
      const mediaObject = media(item, geometry, appObj);
      return mediaObject;
    });

    mediaItemsArray.forEach(item => {
      container.add(item.mesh);
    });
  };

  const update = () => {
    if (mediaItemsArray) {
      mediaItemsArray.forEach(media => media.update());
    }
  };

  const destroy = () => {
    mediaItemsArray = [];
    window.removeEventListener('resize', onResize);
  };

  const onResize = () => {
    if (mediaItemsArray) {
      mediaItemsArray.forEach(media => media.onResize());
    }
  };

  const init = () => {
    window.addEventListener('resize', onResize);
    createGeometry();
    generatePlanes(appProps.flowItemsArray);
  };

  return {
    container,
    init,
    destroy,
    update,
  };
};
