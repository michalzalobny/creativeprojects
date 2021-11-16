import * as THREE from 'three';

export interface MediaItem {
  item: THREE.Texture | THREE.Group;
  naturalWidth: number;
  naturalHeight: number;
}

export type MediaItems = Record<string, MediaItem>;

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

export interface AnimateProps {
  duration?: number;
  delay?: number;
  destination: number;
  easing?: (amount: number) => number;
}

export type DirectionX = 'left' | 'right';
export type DirectionY = 'up' | 'down';

export interface ScrollValues {
  current: Coords;
  target: Coords;
  last: Coords;
  direction: {
    x: DirectionX;
    y: DirectionY;
  };
  strength: {
    current: number;
    target: number;
  };
}

export interface ItemProps {
  itemKey: number;
  itemKeyReverse: number;
  type: string;
  imageSrc: string;
}

interface PreloadItem {
  src: string;
  type: string;
}

export type PreloadItems = (PreloadItem | null)[];
