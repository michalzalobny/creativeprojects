import { CreativeItem } from 'utils/types/strapi/CreativeItem';
import * as THREE from 'three';

export type Textures = Record<string, THREE.Texture>;
export interface UpdateInfo {
  slowDownFactor: number;
  delta: number;
  time: number;
}

export interface Bounds {
  width: number;
  height: number;
}

export interface GalleryItemProps {
  key: number;
  item: CreativeItem;
}

export interface Coords {
  x: number;
  y: number;
}

export interface Mouse {
  current: Coords;
  target: Coords;
}
