import * as THREE from 'three';

import { MouseMove } from '../Singletons/MouseMove';
import { Bounds, UpdateInfo, Mouse } from '../types';
import {
  InteractiveObject3D,
  ColliderName,
} from '../Components/InteractiveObject3D';
import { IntersectiveBackground3D } from '../Components/IntersectiveBackground3D';
import { lerp } from '../utils/lerp';

interface Constructor {
  camera: THREE.PerspectiveCamera;
  mouseMove: MouseMove;
}

interface PerformRaycast {
  x: number;
  y: number;
  colliderName?: ColliderName;
  fnToCallIfHit?: string;
}

export class InteractiveScene extends THREE.Scene {
  static lerpEase = 0.06;

  _raycaster = new THREE.Raycaster();
  _rendererBounds: Bounds = { height: 100, width: 100 };
  _camera: THREE.PerspectiveCamera;
  _mouseMove: MouseMove;

  _mouse2D: Mouse = {
    current: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
  };
  _mouse3D: Mouse = {
    current: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
  };
  _mouseStrength = {
    current: 0,
    target: 0,
  };

  _intersectPoint = new THREE.Vector3(0);
  _intersectPointLerp = new THREE.Vector3(0);
  _hoveredObject: InteractiveObject3D | null = null;
  _canHoverObject = true;
  _intersectiveBackground3D = new IntersectiveBackground3D();

  constructor({ mouseMove, camera }: Constructor) {
    super();
    this._camera = camera;
    this._mouseMove = mouseMove;

    this.add(this._intersectiveBackground3D);
  }

  _performRaycast({ x, y, colliderName, fnToCallIfHit }: PerformRaycast) {
    this._raycaster.setFromCamera({ x, y }, this._camera);
    const intersects = this._raycaster.intersectObjects(this.children, true);
    const intersectingObjects: InteractiveObject3D[] = [];

    for (let i = 0; i < intersects.length; ++i) {
      const interactiveObject = intersects[i].object
        .parent as InteractiveObject3D;
      if (interactiveObject.colliderName) {
        intersectingObjects.push(interactiveObject);
        if (fnToCallIfHit) {
          if (interactiveObject.colliderName === colliderName) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            interactiveObject[fnToCallIfHit]();
          }
        }
        break;
      }
    }

    return intersectingObjects;
  }

  _onMouseMove = (e: THREE.Event) => {
    this._mouseStrength.target = (e.target as MouseMove).strength;

    const mouseX = (e.target as MouseMove).mouse.x;
    const mouseY = (e.target as MouseMove).mouse.y;

    this._mouse2D.target.x = mouseX;
    this._mouse2D.target.y = mouseY;

    this._mouse3D.target.x = (mouseX / this._rendererBounds.width) * 2 - 1;
    this._mouse3D.target.y = -(mouseY / this._rendererBounds.height) * 2 + 1;

    const intersectPoint = this._intersectiveBackground3D.getIntersectPoint(
      this._mouse3D.target.x,
      this._mouse3D.target.y,
      this._raycaster,
      this._camera,
    );

    if (intersectPoint) {
      this._intersectPoint = intersectPoint;
    }

    const objects = this._performRaycast({
      x: this._mouse3D.target.x,
      y: this._mouse3D.target.y,
    });

    if (objects.length > 0 && this._canHoverObject) {
      const hoveredObject = objects[0];
      if (hoveredObject !== this._hoveredObject) {
        if (this._hoveredObject) {
          this._hoveredObject.onMouseLeave();
        }
        this._hoveredObject = hoveredObject;
        this._hoveredObject.onMouseEnter();
      }
    } else if (this._hoveredObject) {
      this._hoveredObject.onMouseLeave();
      this._hoveredObject = null;
    }
  };

  _onClick = (e: THREE.Event) => {
    const mouseX = (e.target as MouseMove).mouse.x;
    const mouseY = (e.target as MouseMove).mouse.y;

    const mouse3DX = (mouseX / this._rendererBounds.width) * 2 - 1;
    const mouse3DY = -(mouseY / this._rendererBounds.height) * 2 + 1;

    this._performRaycast({
      x: mouse3DX,
      y: mouse3DY,
      colliderName: 'cardItem',
      fnToCallIfHit: 'onClick',
    });
  };

  _addListeners() {
    this._mouseMove.addEventListener('mousemove', this._onMouseMove);
    this._mouseMove.addEventListener('click', this._onClick);
  }

  _removeListeners() {
    this._mouseMove.removeEventListener('mousemove', this._onMouseMove);
    this._mouseMove.removeEventListener('click', this._onClick);
  }

  set rendererBounds(bounds: Bounds) {
    this._rendererBounds = bounds;
  }

  update(updateInfo: UpdateInfo) {
    //Lerp mouse move strength
    this._mouseStrength.current = lerp(
      this._mouseStrength.current,
      this._mouseStrength.target,
      InteractiveScene.lerpEase * updateInfo.slowDownFactor,
    );

    //Lerp 2D mouse coords
    this._mouse2D.current.x = lerp(
      this._mouse2D.current.x,
      this._mouse2D.target.x,
      InteractiveScene.lerpEase * updateInfo.slowDownFactor,
    );
    this._mouse2D.current.y = lerp(
      this._mouse2D.current.y,
      this._mouse2D.target.y,
      InteractiveScene.lerpEase * updateInfo.slowDownFactor,
    );

    //Lerp 3D mouse coords
    this._mouse3D.current.x = lerp(
      this._mouse3D.current.x,
      this._mouse3D.target.x,
      InteractiveScene.lerpEase * updateInfo.slowDownFactor,
    );
    this._mouse3D.current.y = lerp(
      this._mouse3D.current.y,
      this._mouse3D.target.y,
      InteractiveScene.lerpEase * updateInfo.slowDownFactor,
    );

    //Lerp intersect 3D point
    const intersectLerpX = lerp(
      this._intersectPointLerp.x,
      this._intersectPoint.x,
      InteractiveScene.lerpEase * updateInfo.slowDownFactor,
    );

    const intersectLerpY = lerp(
      this._intersectPointLerp.y,
      this._intersectPoint.y,
      InteractiveScene.lerpEase * updateInfo.slowDownFactor,
    );

    const intersectLerpZ = lerp(
      this._intersectPointLerp.z,
      this._intersectPoint.z,
      InteractiveScene.lerpEase * updateInfo.slowDownFactor,
    );

    this._intersectPointLerp.set(
      intersectLerpX,
      intersectLerpY,
      intersectLerpZ,
    );
  }

  destroy() {
    this._removeListeners();
    this._intersectiveBackground3D.destroy();
    this.remove(this._intersectiveBackground3D);
  }
}
