import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

import { UpdateInfo, AppObj, App } from './app';
import vertexShader from './shaders/mediaSlide/vertex.glsl';
import fragmentShader from './shaders/mediaSlide/fragment.glsl';
import { getRandBetween } from './utils/getRandBetween';
import { WorldState } from './world';
import { touchTexture } from './touchTexture';

interface Model {
  appObj: AppObj;
  appProps: App;
  worldState: WorldState;
  paginateSlide: (newVal: number) => void;
}

export const model = ({
  paginateSlide,
  worldState,
  appProps,
  appObj,
}: Model) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const planeSizes = {
    PLANE_WIDTH: 1,
    PLANE_HEIGHT: 1,
    get PARTICLE_DENSITY() {
      return (this.PLANE_HEIGHT / this.PLANE_HEIGHT) * 0.42;
    },
  };

  let mesh = null;
  let myTouchTexture = null;
  let touchTexturePlane: THREE.Mesh;
  let geometry: THREE.PlaneBufferGeometry = null;
  let material = null;

  const createMesh = () => {
    if (mesh) {
      geometry.dispose();
      material.dispose();
      appObj.scene.remove(mesh);
    }

    material = new THREE.ShaderMaterial({
      transparent: true,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        tMap: { value: null },
        tPrev: { value: null },
        uProgress: { value: 0 },
        uPlaneSizes: {
          value: new THREE.Vector2(
            planeSizes.PLANE_WIDTH,
            planeSizes.PLANE_HEIGHT,
          ),
        },
        uImageSizes: { value: new THREE.Vector2(0, 0) },
        uPrevImageSizes: { value: new THREE.Vector2(0, 0) },
        uViewportSizes: {
          value: new THREE.Vector2(
            appObj.viewportSizes.width,
            appObj.viewportSizes.height,
          ),
        },
        uTouch: { value: null },
        uTouchSizes: {
          value: new THREE.Vector2(0, 0),
        },
        uTime: { value: 0 },
        uScrollY: { value: 0 },
        uMouse3D: { value: new THREE.Vector3(0, 0, 0) },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 1) },
        uPointSize: { value: 2.2 },
        uScrollAnimation: { value: 0 },
        uCameraZ: { value: appObj.camera.position.z },
        uScroll: { value: 0 },
      },
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
    });

    geometry = new THREE.PlaneBufferGeometry(
      planeSizes.PLANE_WIDTH,
      planeSizes.PLANE_HEIGHT,
      planeSizes.PLANE_WIDTH * planeSizes.PARTICLE_DENSITY,
      planeSizes.PLANE_HEIGHT * planeSizes.PARTICLE_DENSITY,
    );

    mesh = new THREE.Points(geometry, material);

    touchTexturePlane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(
        planeSizes.PLANE_WIDTH,
        planeSizes.PLANE_HEIGHT,
      ),
      new THREE.MeshBasicMaterial(),
    );

    appObj.scene.add(mesh);

    updateTexture();
    updateAttributes();
    setListeners();
  };

  const loadImage = ({ imageSrc, loadFn }) => {
    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = 'anonymous';

    image.onload = () => {
      loadFn(image);
    };
  };

  const updateTexture = () => {
    material.uniforms.tPrev.value = material.uniforms.tMap.value;
    material.uniforms.uPrevImageSizes.value =
      material.uniforms.uImageSizes.value;

    const imageEl = appProps.creativeItems[worldState.slideIndex].image;
    const imageSrc = imageEl.formats
      ? imageEl.formats.large?.url ||
        imageEl.formats.medium?.url ||
        imageEl.formats.small?.url ||
        imageEl.formats.thumbnail.url
      : imageEl.url;

    const onImageElLoad = (image: HTMLImageElement) => {
      const texture = new THREE.Texture();
      texture.image = image;
      texture.needsUpdate = true;
      material.uniforms.tMap.value = texture;
      material.uniforms.uImageSizes.value = [
        image.naturalWidth,
        image.naturalHeight,
      ];
      animateProgress(1);
    };
    loadImage({ imageSrc, loadFn: onImageElLoad });
  };

  const updateAttributes = () => {
    const count = geometry.attributes.position.count;
    const randomArray = new Float32Array(count);
    const offsetArray = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      randomArray[i] = getRandBetween(-120, 120);
      offsetArray[i] = getRandBetween(-1000, 1000);
    }
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randomArray, 1));
    geometry.setAttribute('aOffset', new THREE.BufferAttribute(offsetArray, 1));
  };

  const raycaster = new THREE.Raycaster();
  const raycasterT = new THREE.Raycaster();

  let tweenProgress;
  const animateProgress = destination => {
    if (tweenProgress) {
      tweenProgress.stop();
    }

    if (material.uniforms.uProgress.value > 0) {
      material.uniforms.uProgress.value = 0;
    }

    tweenProgress = new TWEEN.Tween({
      progress: material.uniforms.uProgress.value,
    })
      .to({ progress: destination }, 800)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(obj => {
        material.uniforms.uProgress.value = obj.progress;
      });

    tweenProgress.start();
  };

  let scrollProgress;
  let scrollDestination = 0;
  const animateScroll = destination => {
    if (scrollProgress) {
      scrollProgress.stop();
    }

    if (scrollDestination === 0) {
      scrollDestination = 1;
    } else {
      scrollDestination = 0;
    }

    scrollProgress = new TWEEN.Tween({
      progress: material.uniforms.uScrollAnimation.value,
    })
      .to({ progress: destination }, 800)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(obj => {
        material.uniforms.uScrollAnimation.value = obj.progress;
      });

    scrollProgress.start();
  };

  const changePhoto = (direction: number) => {
    appProps.paginate(direction);
    paginateSlide(direction);
    updateTexture();
  };

  const handleClick = () => {
    if (scrollDestination === 1) {
      changePhoto(1);
    }

    animateScroll(scrollDestination === 1 ? 0 : 1);
  };

  const onResize = () => {
    if (appObj.viewportSizes.width / appObj.viewportSizes.height > 1) {
      planeSizes.PLANE_WIDTH = 0.27 * appObj.viewportSizes.width;
      planeSizes.PLANE_HEIGHT = 0.31 * appObj.viewportSizes.height;
    } else {
      planeSizes.PLANE_WIDTH = 0.5 * appObj.viewportSizes.width;
      planeSizes.PLANE_HEIGHT = 0.5 * appObj.viewportSizes.height;
    }

    createMesh();

    material.uniforms.uPlaneSizes.value = new THREE.Vector2(
      planeSizes.PLANE_WIDTH,
      planeSizes.PLANE_HEIGHT,
    );

    material.uniforms.uViewportSizes.value = new THREE.Vector2(
      appObj.viewportSizes.width,
      appObj.viewportSizes.height,
    );

    myTouchTexture = touchTexture({
      sizeX: planeSizes.PLANE_WIDTH,
      sizeY: planeSizes.PLANE_HEIGHT,
    });

    // myTouchTexture.initTexture();
    material.uniforms.uTouch.value = myTouchTexture.texture;
  };

  const setListeners = () => {
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', onResize);
  };

  const destroyListeners = () => {
    window.removeEventListener('click', handleClick);
    window.removeEventListener('resize', onResize);
  };

  const raycasterPlane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1000, 1000),
    new THREE.MeshBasicMaterial(),
  );

  const update = (updateInfo: UpdateInfo) => {
    if (!mesh && !material && !geometry) {
      return;
    }

    material.uniforms.uTime.value = updateInfo.time / 1000;
    material.uniforms.uScrollY.value = appObj.scroll.scrollObj.currentY;
    //Set mouse raycaster
    raycaster.setFromCamera(
      appObj.mouseMove.mouseMoveObj.mouse3DLerp,
      appObj.camera,
    );

    raycasterT.setFromCamera(
      appObj.mouseMove.mouseMoveObj.mouse3D,
      appObj.camera,
    );

    //Detect touch raycaster (plane is the same size as the image)
    let intersectsTouchTexture;
    if (touchTexturePlane) {
      intersectsTouchTexture = raycasterT.intersectObjects([touchTexturePlane]);

      if (intersectsTouchTexture[0]) {
        if (myTouchTexture) {
          myTouchTexture.addTouch(intersectsTouchTexture[0].uv);
        }
      }
    }

    //Detect mousemove for the whole scene
    const intersects = raycaster.intersectObjects([raycasterPlane]);

    if (myTouchTexture) {
      myTouchTexture.update(updateInfo);
    }

    if (intersects[0]) {
      material.uniforms.uMouse3D.value = intersects[0].point;
    }

    material.uniforms.uScroll.value = appObj.scroll.scrollObj.currentY;
  };

  const loadImages = () => {
    let loadedAmount = 0;
    appProps.creativeItems.forEach(item => {
      const imageSrc = item.image.formats
        ? item.image.formats.large?.url ||
          item.image.formats.medium?.url ||
          item.image.formats.small?.url ||
          item.image.formats.thumbnail.url
        : item.image.url;

      const onImageLoad = () => {
        loadedAmount += 1;
        if (loadedAmount >= appProps.creativeItems.length) {
          appProps.setIsReady(true);
          onResize();
        }
      };

      loadImage({ imageSrc, loadFn: onImageLoad });
    });
  };

  const init = () => {
    loadImages();
  };

  const destroy = () => {
    destroyListeners();
  };

  init();

  return {
    container,
    update,
    destroy,
  };
};
