import { getRandBetween } from './utils/getRandBetween';
import { AppObj } from './app';

export class Particle {
  appObj: AppObj;
  color: string;
  radius: number;
  radians: number;
  velocity: number;
  xCopy: number;
  yCopy: number;
  randomValue: number;

  constructor(x, y, radius, color, appObj) {
    this.appObj = appObj;
    this.color = color;
    this.radius = radius;

    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.05;
    this.xCopy = x;
    this.yCopy = y;

    this.randomValue = getRandBetween(50, 120);
  }

  draw(lastPoint) {
    this.appObj.ctx.beginPath();
    this.appObj.ctx.strokeStyle = this.color;
    this.appObj.ctx.lineWidth = this.radius;
    this.appObj.ctx.moveTo(lastPoint.x, lastPoint.y);
    this.appObj.ctx.lineTo(this.xCopy, this.yCopy);
    this.appObj.ctx.stroke();
    this.appObj.ctx.closePath();
  }

  update() {
    const lastPoint = { x: this.xCopy, y: this.yCopy };

    const {
      x: mouseX,
      y: mouseY,
    } = this.appObj.mouseMove.mouseMoveObj.mouseLerp;

    this.radians += this.velocity;
    this.xCopy = mouseX + Math.cos(this.radians) * this.randomValue;
    this.yCopy = mouseY + Math.sin(this.radians) * this.randomValue;

    this.draw(lastPoint);
  }
}
