import * as THREE from 'three';

import { MouseMove } from '../MouseMove/MouseMove';
import { Bounds, UpdateInfo, Coords } from '../types';
import {
  InteractiveObject3D,
  ColliderName,
} from '../Components/InteractiveObject3D';
import { IntersectiveBackground3D } from '../Components/IntersectiveBackground3D';

interface Constructor {
  camera: THREE.PerspectiveCamera;
  mouseMove: MouseMove;
}

export class InteractiveScene extends THREE.Scene {
  _raycaster = new THREE.Raycaster();
  _rendererBounds: Bounds = { height: 100, width: 100 };
  _camera: THREE.PerspectiveCamera;
  _mouseMove: MouseMove;
  _mouse3D: Coords = { x: 0, y: 0 };
  _mouse3DLerp: Coords = { x: 0, y: 0 };
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

  _performRaycast(
    x: number,
    y: number,
    colliderName: ColliderName,
    fnToCallIfHit?: string,
  ) {
    this._raycaster.setFromCamera({ x, y }, this._camera);
    const intersects = this._raycaster.intersectObjects(this.children, true);
    const intersectingObjects: InteractiveObject3D[] = [];

    for (let i = 0; i < intersects.length; ++i) {
      const interactiveObject = intersects[i].object
        .parent as InteractiveObject3D;
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

    const objects = this._performRaycast(
      this._mouse3D.x,
      this._mouse3D.y,
      'galleryItem',
    );

    if (objects.length > 0 && this._canHoverObject) {
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

  _onClick = (e: THREE.Event) => {
    const mouseX = (e.target as MouseMove).mouse.x;
    const mouseY = (e.target as MouseMove).mouse.y;

    const mouse3DX = (mouseX / this._rendererBounds.width) * 2 - 1;
    const mouse3DY = -(mouseY / this._rendererBounds.height) * 2 + 1;

    this._performRaycast(mouse3DX, mouse3DY, 'galleryItem', 'onClick');
  };

  _addListeners() {
    this._mouseMove.addEventListener('mousemoved', this._onMouseMove);
    this._mouseMove.addEventListener('clicked', this._onClick);
  }

  _removeListeners() {
    this._mouseMove.removeEventListener('mousemoved', this._onMouseMove);
    this._mouseMove.removeEventListener('clicked', this._onClick);
  }

  set rendererBounds(bounds: Bounds) {
    this._rendererBounds = bounds;
  }

  update(updateInfo: UpdateInfo) {}

  destroy() {
    this._removeListeners();
    this._intersectiveBackground3D.destroy();
    this.remove(this._intersectiveBackground3D);
  }
}
