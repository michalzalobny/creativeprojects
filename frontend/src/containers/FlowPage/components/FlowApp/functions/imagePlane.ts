import * as THREE from 'three';

import { FlowItem } from 'containers/FlowPage/components/FlowApp/FlowApp';

import { media, MediaItem } from './media';
import { App, appObj } from './app';

interface ImagePlane {
  appProps: App;
}

export const imagePlane = ({ appProps }: ImagePlane) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  let mediaItemsArray: MediaItem[] = [];

  const generatePlanes = (flowItems: FlowItem[]) => {
    mediaItemsArray = flowItems.map(item => {
      const mediaObject = media(item);
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
    generatePlanes(appProps.flowItemsArray);
  };

  return {
    container,
    init,
    destroy,
    update,
  };
};
