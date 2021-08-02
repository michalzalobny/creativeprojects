import * as THREE from 'three';

export class SpiralSpline extends THREE.Object3D {
  static getPointPosition(
    progress: number,
    radius: number,
    loops: number,
    offset: number,
    depth: number,
  ) {
    return {
      x: Math.sin(progress * loops * Math.PI * 2 + offset) * radius * progress,
      y: Math.cos(progress * loops * Math.PI * 2 + offset) * radius * progress,
      z: -depth,
    };
  }

  radius: number;
  loops: number;
  offset: number;
  density: number;
  depth: number;

  constructor(radius = 100, loops = 5, offset = 50, density = 500, depth = 50) {
    super();
    this.radius = radius;
    this.loops = loops;
    this.offset = offset;
    this.density = density;
    this.depth = depth;
    this._drawSpiral();
  }

  _drawSpiral() {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < this.density; ++i) {
      const position = this.getPointPosition((i + 1) / this.density);
      points.push(new THREE.Vector3(position.x, position.y, position.z));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineDashedMaterial({
      color: '#AF914F',
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
      this.offset,
      this.depth,
    );
  }
}
