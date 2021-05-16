import * as THREE from 'three';

import { SlideItem } from 'containers/FlowPage/components/FlowApp/FlowApp';

import { mediaSlide, MediaItem } from './mediaSlide';
import { App, AppObj } from './app';

interface ImageSlider {
  appProps: App;
  appObj: AppObj;
}

export const imageSlider = ({ appObj, appProps }: ImageSlider) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  let loadedCounter = 0;

  let mediaItemsArray: MediaItem[] = [];

  let geometry: THREE.PlaneBufferGeometry;

  const createGeometry = () => {
    geometry = new THREE.PlaneBufferGeometry(1, 1, 50, 50);
  };

  const generatePlanes = (flowItems: SlideItem[]) => {
    mediaItemsArray = flowItems.map(item => {
      const mediaObject = mediaSlide(item, geometry, appObj, updateLoadStatus);
      return mediaObject;
    });

    mediaItemsArray.forEach(item => {
      container.add(item.mesh);
    });
  };

  const updateLoadStatus = () => {
    loadedCounter += 1;
    if (loadedCounter === mediaItemsArray.length) {
      appProps.setIsReady(true);
    }
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
