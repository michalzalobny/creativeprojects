import * as THREE from 'three';

export class SpiralSpline extends THREE.Object3D {
  static getPointPosition(
    progress: number,
    radius: number,
    loops: number,
    depth: number,
    funnel: number,
    offset: number,
  ) {
    return {
      x:
        Math.sin(progress * loops * Math.PI * 2 + offset) *
        radius *
        Math.pow((1 - progress) * funnel, 0.5),
      y:
        Math.cos(progress * loops * Math.PI * 2 + offset) *
        radius *
        Math.pow((1 - progress) * funnel, 0.5),
      z: -progress * depth,
    };
  }

  radius: number;
  loops: number;
  depth: number;
  funnel: number;
  offset: number;

  constructor(
    radius = 100,
    loops = 5,
    depth = 200,
    funnel = 1,
    offset = 0,
    density = 500,
  ) {
    super();
    this.radius = radius;
    this.loops = loops;
    this.depth = depth;
    this.funnel = funnel;
    this.offset = offset;

    const points: THREE.Vector3[] = [];
    for (let i = 0; i < density; ++i) {
      const position = this.getPointPosition((i + 1) / density);
      points.push(new THREE.Vector3(position.x, position.y, position.z));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineDashedMaterial({
      color: 'white',
      linewidth: 1,
      scale: 1,
      dashSize: 0.4,
      gapSize: 0.4,
    });

    // Create the final object to add to the scene
    const curveObject = new THREE.Line(geometry, material);
    curveObject.computeLineDistances();

    this.add(curveObject);
  }

  getPointPosition(progress: number) {
    return SpiralSpline.getPointPosition(
      progress,
      this.radius,
      this.loops,
      this.depth,
      this.funnel,
      this.offset,
    );
  }
}
