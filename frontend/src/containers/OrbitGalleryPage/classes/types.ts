import { CreativeItem } from 'utils/types/strapi/CreativeItem';

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
