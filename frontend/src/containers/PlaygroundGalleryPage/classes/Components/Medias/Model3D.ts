import * as THREE from 'three';

import { MediaHolder3D } from '../MediaHolder3D';
import { ItemProps, MediaItem, UpdateInfo, Bounds } from '../../types';

interface Constructor {
  geometry: THREE.PlaneGeometry;
  cardItem: ItemProps;
  domEl: HTMLElement;
  galleryDomEl: HTMLElement;
}

export class Model3D extends MediaHolder3D {
  _mediaItem: MediaItem | null = null;
  _3dModelGroup: THREE.Group | null = null;
  _3dModelDimensions = { x: 1, y: 1, z: 1 };

  constructor({ cardItem, galleryDomEl, domEl, geometry }: Constructor) {
    super({ domEl, galleryDomEl, cardItem, geometry });
  }

  _updateTexture() {
    if (this._material && this._mediaItem && this._mesh) {
      this._material.uniforms.tMap.value = this._mediaItem.item;

      this._material.uniforms.uImageSizes.value = [
        this._mediaItem.naturalWidth,
        this._mediaItem.naturalHeight,
      ];
    }
  }

  _updateModelScale() {
    if (!this._3dModelGroup || !this._mesh) return;

    //Set uniform models scale to match the grid
    this._3dModelGroup.scale.x =
      (0.5 / this._3dModelDimensions.x) * 0.01 * this._mesh.scale.x * 1.2;
    this._3dModelGroup.scale.y =
      (0.5 / this._3dModelDimensions.y) * 0.01 * this._mesh.scale.x * 1.2;
    this._3dModelGroup.scale.z =
      (0.5 / this._3dModelDimensions.z) * 0.01 * this._mesh.scale.x * 1.2;
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);

    //Copies mesh position to be properly situated on the scene
    if (this._3dModelGroup && this._mesh)
      this._3dModelGroup.position.copy(this._mesh.position);

    //Vertically align the model
    if (this._3dModelGroup && this._mesh)
      this._3dModelGroup.position.y -= this._mesh.scale.y / 2;

    //Auto rotate model
    if (this._3dModelGroup) this._3dModelGroup.rotation.y += 0.01;
  }

  //To set the models opacity, we need to iterate over each child and set it's opacity individually
  setModelOpacity = (
    obj: THREE.Mesh | THREE.Group | THREE.Object3D,
    value: number,
  ) => {
    if ('material' in obj) {
      if ('transparent' in obj.material) obj.material.transparent = true;
      if ('opacity' in obj.material) obj.material.opacity = value;
    }
    for (const child of obj.children) {
      this.setModelOpacity(child, value);
    }
  };

  setOpacity(value: number) {
    super.setOpacity(value);
    this._3dModelGroup && this.setModelOpacity(this._3dModelGroup, value);
  }

  destroy() {
    super.destroy();
    if (this._3dModelGroup) {
      this.remove(this._3dModelGroup);
    }
  }

  set mediaItem(mediaItem: MediaItem) {
    this._3dModelGroup = mediaItem.item as THREE.Group;
    if (!this._mesh) return;

    //Get the natural model dimenstions set earlier in Preloader Utility
    this._3dModelDimensions.x = mediaItem.naturalWidth;
    this._3dModelDimensions.y = mediaItem.naturalHeight;
    this._3dModelDimensions.z = mediaItem.naturalHeight;

    this._updateModelScale();

    this.add(this._3dModelGroup);
  }

  setRendererBounds(bounds: Bounds) {
    super.setRendererBounds(bounds);
    this._updateModelScale();
  }
}
