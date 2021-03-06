import { CreativeItem } from 'utils/types/strapi/CreativeItem';
import * as THREE from 'three';

export interface TextureItem {
  texture: THREE.Texture;
  naturalWidth: number;
  naturalHeight: number;
}

export type TextureItems = Record<string, TextureItem>;

export interface UpdateInfo {
  slowDownFactor: number;
  delta: number;
  time: number;
}

export interface Bounds {
  width: number;
  height: number;
}

export interface FollowItemProps {
  reverseKey: number;
  key: number;
  item: CreativeItem;
  itemsAmount: number;
}

export interface Coords {
  x: number;
  y: number;
}

export interface Mouse {
  current: Coords;
  target: Coords;
}

export interface MouseValues {
  current: Coords;
  target: Coords;
  last: Coords;
  strength: {
    current: number;
    target: number;
  };
  autoSpeed: Coords;
}
