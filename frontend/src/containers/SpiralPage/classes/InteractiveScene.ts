import * as THREE from 'three';

import { MouseMove } from './MouseMove/MouseMove';
import { Bounds, UpdateInfo, Coords } from './types';
import { InteractiveObject, ColliderName } from './InteractiveObject';
import { IntersectiveBackground3D } from './IntersectiveBackground3D';

export class InteractiveScene extends THREE.Scene {
  _raycaster = new THREE.Raycaster();
  _rendererBounds: Bounds = { height: 100, width: 100 };
  _camera: THREE.PerspectiveCamera;
  _mouseMove: MouseMove;
  _mouse3D: Coords = { x: 0, y: 0 };
  _mouse3DLerp: Coords = { x: 0, y: 0 };
  _intersectPoint = new THREE.Vector3(0);
  _intersectPointLerp = new THREE.Vector3(0);
  _hoveredObject: InteractiveObject | null = null;
  _intersectiveBackground3D = new IntersectiveBackground3D();

  constructor(camera: THREE.PerspectiveCamera, mouseMove: MouseMove) {
    super();
    this._camera = camera;
    this._mouseMove = mouseMove;
  }

  _performRaycast(
    x: number,
    y: number,
    colliderName: ColliderName,
    fnToCallIfHit?: string,
  ) {
    this._raycaster.setFromCamera({ x, y }, this._camera);
    const intersects = this._raycaster.intersectObjects(this.children, true);
    const intersectingObjects: InteractiveObject[] = [];

    for (let i = 0; i < intersects.length; ++i) {
      const interactiveObject = intersects[i].object
        .parent as InteractiveObject;
      if (interactiveObject.colliderName === colliderName) {
        if (fnToCallIfHit) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          interactiveObject[fnToCallIfHit]();
        }
        intersectingObjects.push(interactiveObject);
        break;
      }
    }

    return intersectingObjects;
  }

  _onMouseMove = (e: THREE.Event) => {
    const mouseX = (e.target as MouseMove).mouse.x;
    const mouseY = (e.target as MouseMove).mouse.y;

    this._mouse3D.x = (mouseX / this._rendererBounds.width) * 2 - 1;
    this._mouse3D.y = -(mouseY / this._rendererBounds.height) * 2 + 1;

    const mouseLerpX = (e.target as MouseMove).mouseLerp.x;
    const mouseLerpY = (e.target as MouseMove).mouseLerp.y;

    this._mouse3DLerp.x = (mouseLerpX / this._rendererBounds.width) * 2 - 1;
    this._mouse3DLerp.y = -(mouseLerpY / this._rendererBounds.height) * 2 + 1;

    const objects = this._performRaycast(
      this._mouse3D.x,
      this._mouse3D.y,
      'storyItem',
    );

    const intersectPoint = this._intersectiveBackground3D.getIntersectPoint(
      this._mouse3D.x,
      this._mouse3D.y,
      this._raycaster,
      this._camera,
    );

    if (intersectPoint) {
      this._intersectPoint = intersectPoint;
    }

    const intersectPointLerp = this._intersectiveBackground3D.getIntersectPoint(
      this._mouse3DLerp.x,
      this._mouse3DLerp.y,
      this._raycaster,
      this._camera,
    );

    if (intersectPointLerp) {
      this._intersectPointLerp = intersectPointLerp;
    }

    if (objects.length > 0) {
      const hoveredObject = objects[0];
      if (hoveredObject !== this._hoveredObject) {
        if (this._hoveredObject) {
          this._hoveredObject.onMouseOut();
        }
        this._hoveredObject = hoveredObject;
        this._hoveredObject.onMouseOver();
      }
    } else if (this._hoveredObject) {
      this._hoveredObject.onMouseOut();
      this._hoveredObject = null;
    }
  };

  _setListeners() {
    this._mouseMove.addEventListener('mousemoved', this._onMouseMove);
  }

  _removeListeners() {
    this._mouseMove.removeEventListener('mousemoved', this._onMouseMove);
  }

  init() {
    this._setListeners();
    this._intersectiveBackground3D.init();
    this.add(this._intersectiveBackground3D);
  }

  update(updateInfo: UpdateInfo) {}

  destroy() {
    this._removeListeners();
    this._intersectiveBackground3D.destroy();
  }

  set rendererBounds(bounds: Bounds) {
    this._rendererBounds = bounds;
  }
}
