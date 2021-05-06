import React, { memo, useRef, useState, useEffect } from 'react';
import { MotionValue } from 'framer-motion';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import sync, { cancelSync, FrameData } from 'framesync';

import { Wrapper } from './styled/Wrapper';
import { RendererWrapper } from './styled/RendererWrapper';
import { Cover } from './styled/Cover';
import { FlowItemRef } from '../../FlowApp';
import { world } from './functions/world';

export interface CanvasSectionProps {
  flowItemsArray: React.MutableRefObject<FlowItemRef[]>;
  offsetX: MotionValue<number>;
  offsetY: MotionValue<number>;
}

export const CAMERA_POS = 100;

export const CanvasSection = memo<CanvasSectionProps>(props => {
  const { offsetYRef, offsetX, offsetY, flowItemsArray } = props;
  const [isReady, setIsReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  const appObj = useRef({});

  const camera = useRef<THREE.PerspectiveCamera>(null);
  const scene = useRef<THREE.Scene>(null);
  const renderer = useRef<THREE.WebGLRenderer>(null);
  const sizes = useRef<DOMRect>(null);

  useEffect(() => {
    setSizes();
    setCamera();
    setRenderer();
    onResize();
    const { destroy, update: updateSetWorld } = setWorld();
    setListeners();
    setIsReady(true);

    const render = (frameData: FrameData) => {
      // TWEEN.update(frameData.timestamp);

      renderer.current.render(scene.current, camera.current);
      // updateSetWorld();
      // updateSetWorld();
    };
    sync.render(render, true, true);
    sync.update(updateSetWorld, true, true);
  }, []);

  const setCamera = () => {
    camera.current = new THREE.PerspectiveCamera();

    camera.current.near = 0.1;
    camera.current.far = 200;

    updateCameraSettings();

    camera.current.position.set(0, 0, CAMERA_POS);
    camera.current.lookAt(0, 0, 0);
  };

  const updateCameraSettings = () => {
    const aspectRatio = sizes.current.width / sizes.current.height;
    camera.current.aspect = aspectRatio;

    //Set to match pixel size of the elements in three with pixel size of DOM elements
    camera.current.fov =
      2 *
      Math.atan(sizes.current.height / 2 / camera.current.position.z) *
      (180 / Math.PI);

    camera.current.updateProjectionMatrix();
  };

  const setRenderer = () => {
    scene.current = new THREE.Scene();

    renderer.current = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });

    renderer.current.shadowMap.enabled = true;
    renderer.current.outputEncoding = THREE.sRGBEncoding;
    renderer.current.setClearColor(new THREE.Color('#c2d0ff'));
    renderer.current.physicallyCorrectLights = true;
  };

  const setSizes = () => {
    sizes.current = canvasWrapperRef.current.getBoundingClientRect();
  };

  const onResize = () => {
    setSizes();
    renderer.current.setSize(sizes.current.width, sizes.current.height);
    renderer.current.setPixelRatio(
      Math.min(Math.max(window.devicePixelRatio, 1.5), 2),
    );

    updateCameraSettings();
  };

  const setListeners = () => {
    window.addEventListener('resize', onResize);
  };

  const setWorld = () => {
    const { update, destroy, container } = world({
      offsetY: offsetYRef,
      sizes: sizes.current,
      offsetX,
      flowItemsArray: flowItemsArray.current,
    });
    scene.current.add(container);
    return { update, destroy };
  };

  const { ...rest } = props;
  return (
    <>
      <Wrapper {...rest}>
        <Cover animate={isReady ? 'animate' : 'initial'} />
        <RendererWrapper ref={canvasWrapperRef}>
          <canvas ref={canvasRef} />
        </RendererWrapper>
      </Wrapper>
    </>
  );
});

CanvasSection.displayName = 'CanvasSection';
