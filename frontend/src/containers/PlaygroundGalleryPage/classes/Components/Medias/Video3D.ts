import { MediaHolder3D } from '../MediaHolder3D';
import { ItemProps, MediaItem } from '../../types';
import { getRandFloat } from '../../utils/getRand';

interface Constructor {
  geometry: THREE.PlaneGeometry;
  cardItem: ItemProps;
  domEl: HTMLElement;
  galleryDomEl: HTMLElement;
}

export class Video3D extends MediaHolder3D {
  _mediaItem: MediaItem | null = null;

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

  set mediaItem(mediaItem: MediaItem) {
    this._mediaItem = mediaItem;
    this._ratioHeight = getRandFloat(0.65, 1.55);
    this._ratioWidth =
      (mediaItem.naturalWidth / mediaItem.naturalHeight) * this._ratioHeight;
    this._updateTexture();
    this.onResize();
  }
}
