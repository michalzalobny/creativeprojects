import * as THREE from 'three';

import { SlideItem } from 'containers/FlowPage/components/FlowApp/FlowApp';

import { media, MediaItem } from './media';
import { App, AppObj } from './app';

interface ImageSlider {
  appProps: App;
  appObj: AppObj;
}

export const imageSlider = ({ appObj, appProps }: ImageSlider) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  let mediaItemsArray: MediaItem[] = [];

  let geometry: THREE.PlaneBufferGeometry;

  const createGeometry = () => {
    geometry = new THREE.PlaneBufferGeometry(1, 1, 50, 50);
  };

  const generatePlanes = (flowItems: SlideItem[]) => {
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
    generatePlanes(appProps.slideItemsArray);
  };

  return {
    container,
    init,
    destroy,
    update,
  };
};
