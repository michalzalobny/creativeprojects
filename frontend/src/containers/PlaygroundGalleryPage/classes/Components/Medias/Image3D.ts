import { MediaHolder3D } from '../MediaHolder3D';
import { ItemProps, TextureItem } from '../../types';

interface Constructor {
  geometry: THREE.PlaneGeometry;
  cardItem: ItemProps;
  domEl: HTMLElement;
  galleryDomEl: HTMLElement;
}

export class Image3D extends MediaHolder3D {
  _textureItem: TextureItem | null = null;

  constructor({ cardItem, galleryDomEl, domEl, geometry }: Constructor) {
    super({ domEl, galleryDomEl, cardItem, geometry });
  }

  _updateTexture() {
    if (this._material && this._textureItem && this._mesh) {
      this._material.uniforms.tMap.value = this._textureItem.texture;

      this._material.uniforms.uImageSizes.value = [
        this._textureItem.naturalWidth,
        this._textureItem.naturalHeight,
      ];
    }
  }

  set textureItem(textureItem: TextureItem) {
    this._textureItem = textureItem;
    this._updateTexture();
    this.onResize();
  }
}
