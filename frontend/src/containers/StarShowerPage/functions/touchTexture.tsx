import * as THREE from 'three';

import { easeOutSine } from './utils/easings';
import { UpdateInfo } from './app';

interface Size {
  sizeX: number;
  sizeY: number;
}

export const touchTexture = ({ sizeX, sizeY }: Size) => {
  const maxAge = 120;
  const touchRadius = 0.12;
  const trail = [];

  let canvas;
  let ctx;
  let texture;

  const bezier = (t, p0, p1, p2, p3) => {
    const cX = 3 * (p1.x - p0.x),
      bX = 3 * (p2.x - p1.x) - cX,
      aX = p3.x - p0.x - cX - bX;

    const cY = 3 * (p1.y - p0.y),
      bY = 3 * (p2.y - p1.y) - cY,
      aY = p3.y - p0.y - cY - bY;

    const x = aX * Math.pow(t, 3) + bX * Math.pow(t, 2) + cX * t + p0.x;
    const y = aY * Math.pow(t, 3) + bY * Math.pow(t, 2) + cY * t + p0.y;

    return { x: x, y: y };
  };

  const drawBezier = () => {
    const accuracy = 0.01, //this'll give the bezier 100 segments
      p0 = { x: 10, y: 10 }, //use whatever points you want obviously
      p1 = { x: 50, y: 100 },
      p2 = { x: 150, y: 200 },
      p3 = { x: 200, y: 75 };

    ctx.moveTo(p0.x, p0.y);

    for (let i = 0; i < 1; i += accuracy) {
      const p = bezier(i, p0, p1, p2, p3);
      ctx.lineTo(p.x, p.y);
    }

    ctx.lineWidth = 20;
    ctx.strokeStyle = 'black';
    ctx.stroke();
  };

  const initTexture = () => {
    canvas = document.createElement('canvas');
    canvas.height = sizeY;
    canvas.width = sizeX;
    ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    texture = new THREE.Texture(canvas);

    canvas.id = 'touchTexture';
    canvas.style.height = `${canvas.height}px`;
    canvas.style.width = `${canvas.width}px`;

    drawBezier();
  };

  initTexture();

  const update = (updateInfo: UpdateInfo) => {
    clear();

    // age points
    trail.forEach((point, i) => {
      point.age++;
      // remove old
      if (point.age > maxAge) {
        trail.splice(i, 1);
      }
    });

    trail.forEach((point, i) => {
      drawTouch(point);
    });

    texture.needsUpdate = true;
  };

  const clear = () => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const addTouch = point => {
    let force = 0;
    const last = trail[trail.length - 1];
    if (last) {
      const dx = last.x - point.x;
      const dy = last.y - point.y;
      const dd = dx * dx + dy * dy;
      force = Math.min(dd * 8000, 1);
    }

    trail.push({ x: point.x, y: point.y, age: 0, force });
  };

  const drawTouch = point => {
    const pos = {
      x: point.x * sizeX,
      y: (1 - point.y) * sizeY,
    };

    let intensity = 1;
    if (point.age < maxAge * 0.3) {
      intensity = easeOutSine(point.age / (maxAge * 0.3), 0, 1, 1);
    } else {
      intensity = easeOutSine(
        1 - (point.age - maxAge * 0.3) / (maxAge * 0.7),
        0,
        1,
        1,
      );
    }

    intensity *= point.force;

    const radius = Math.abs(sizeX * sizeY * 0.002 * touchRadius * intensity);
    const grd = ctx.createRadialGradient(
      pos.x,
      pos.y,
      radius * 0.25,
      pos.x,
      pos.y,
      radius,
    );
    grd.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
    grd.addColorStop(1, 'rgba(0, 0, 0, 0.0)');

    ctx.beginPath();
    ctx.fillStyle = grd;
    ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    ctx.fill();
  };

  return { texture, update, addTouch, initTexture };
};
