import * as THREE from 'three';

import { InteractiveObject3D } from './InteractiveObject3D';

interface Constructor {
  geometry: THREE.PlaneGeometry;
}

export class MediaObject3D extends InteractiveObject3D {
  constructor({ geometry }: Constructor) {
    super();
  }
}
