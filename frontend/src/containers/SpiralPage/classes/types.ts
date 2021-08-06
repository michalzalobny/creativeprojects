import { CreativeItem } from 'utils/types/strapi/CreativeItem';

export interface RendererBounds {
  width: number;
  height: number;
}

export interface UpdateInfo {
  slowDownFactor: number;
  delta: number;
  time: number;
}

export interface Bounds {
  width: number;
  height: number;
}

export interface StoryItemProps {
  number: number;
  item: CreativeItem;
}

export interface Coords {
  x: number;
  y: number;
}
