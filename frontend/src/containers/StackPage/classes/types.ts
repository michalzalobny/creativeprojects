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

export interface Coords {
  x: number;
  y: number;
}

export interface Mouse {
  current: Coords;
  target: Coords;
}

export type DirectionX = 'left' | 'right';
export type DirectionY = 'up' | 'down';

export interface ScrollValues {
  current: Coords;
  target: Coords;
  last: Coords;
  autoScrollSpeed: Coords;
  direction: {
    x: DirectionX;
    y: DirectionY;
  };
  strength: {
    current: number;
    target: number;
  };
}

export interface CardItemProps {
  itemKey: number;
  itemKeyReverse: number;
  item: CreativeItem;
}

export interface IndexDiffs {
  current: number[];
  target: number[];
}
