import * as THREE from 'three';

import { UpdateInfo } from './types';
import { Scroll } from './Scroll/Scroll';
import { MediaScene } from './MediaScene';
import { MouseMove } from './MouseMove/MouseMove';
import { GalleryItem3D } from './GalleryItem3D';

interface Constructor {
  camera: THREE.PerspectiveCamera;
  scroll: Scroll;
  mouseMove: MouseMove;
}

export class GalleryScene extends MediaScene {
  _scroll: Scroll;

  constructor({ camera, mouseMove, scroll }: Constructor) {
    super({ camera, mouseMove });
    this._scroll = scroll;
    this._camera.position.z = 5;
    this._addListeners();
    this._intersectiveBackground3D.setPlaneDepth(0);
  }

  set hoveredStoryItem(hoveredItem: GalleryItem3D | null) {}

  _addListeners() {
    super._addListeners();
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
  }

  destroy() {
    super.destroy();
  }
}
