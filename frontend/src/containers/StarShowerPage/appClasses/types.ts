export interface RendererBounds {
  width: number;
  height: number;
}

export interface UpdateInfo {
  slowDownFactor: number;
  delta: number;
  time: number;
}
