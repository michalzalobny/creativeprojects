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

const PLANE_WIDTH = 500;
const PLANE_HEIGHT = 300;
const PARTICLE_DENSITY = 0.4;

export const model = ({
  paginateSlide,
  worldState,
  appProps,
  appObj,
}: Model) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  let mesh;
  let myTouchTexture;
  const geometry = new THREE.PlaneBufferGeometry(
    PLANE_WIDTH,
    PLANE_HEIGHT,
    PLANE_WIDTH * PARTICLE_DENSITY,
    PLANE_HEIGHT * PARTICLE_DENSITY,
  );

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthTest: false,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: {
      tMap: { value: null },
      tPrev: { value: null },
      uProgress: { value: 0 },
      uPlaneSizes: { value: new THREE.Vector2(PLANE_WIDTH, PLANE_HEIGHT) },
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
      uSpeed: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uPointSize: { value: 2.2 },
      uScrollAnimation: { value: 0 },
      uCameraZ: { value: appObj.camera.position.z },
      uScroll: { value: 0 },
    },
    fragmentShader: fragmentShader,
    vertexShader: vertexShader,
  });

  const createMesh = () => {
    mesh = new THREE.Points(geometry, material);
    container.add(mesh);
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

  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();

  const handleMouseMove = event => {
    mouse.x = (event.clientX / appObj.viewportSizes.width) * 2 - 1;
    mouse.y = -(event.clientY / appObj.viewportSizes.height) * 2 + 1;
  };

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

  const setListeners = () => {
    window.addEventListener('click', handleClick);
    window.addEventListener('mousemove', handleMouseMove);
  };

  const destroyListeners = () => {
    window.removeEventListener('click', handleClick);
    window.removeEventListener('mousemove', handleMouseMove);
  };

  let position = new THREE.Vector3(0, 0, 0);
  let nextPosition;
  let speed = 0;

  const touchTexturePlane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(PLANE_WIDTH, PLANE_HEIGHT),
    new THREE.MeshBasicMaterial(),
  );

  const raycasterPlane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1000, 1000),
    new THREE.MeshBasicMaterial(),
  );

  const update = (updateInfo: UpdateInfo) => {
    material.uniforms.uTime.value = updateInfo.time / 1000;
    material.uniforms.uScrollY.value = appObj.scroll.scrollObj.currentY;
    //Set mouse raycaster
    raycaster.setFromCamera(mouse, appObj.camera);

    //Detect touch raycaster (plane is the same size as the image)
    const intersectsTouchTexture = raycaster.intersectObjects([
      touchTexturePlane,
    ]);

    if (intersectsTouchTexture[0]) {
      if (myTouchTexture) {
        myTouchTexture.addTouch(intersectsTouchTexture[0].uv);
      }
    }

    //Detect mousemove for the whole scene
    const intersects = raycaster.intersectObjects([raycasterPlane]);

    if (intersects[0]) {
      nextPosition = new THREE.Vector3().lerpVectors(
        position,
        intersects[0].point,
        0.1,
      );
    }

    myTouchTexture.update(updateInfo);

    speed = position.distanceTo(nextPosition);

    position = nextPosition;
    material.uniforms.uMouse3D.value = nextPosition;
    material.uniforms.uSpeed.value = speed;
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
          createMesh();
          updateTexture();
          updateAttributes();
          setListeners();
        }
      };

      loadImage({ imageSrc, loadFn: onImageLoad });
    });
  };

  const init = () => {
    loadImages();
    myTouchTexture = touchTexture({ sizeX: PLANE_WIDTH, sizeY: PLANE_HEIGHT });
    // myTouchTexture.initTexture();
    material.uniforms.uTouch.value = myTouchTexture.texture;
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
