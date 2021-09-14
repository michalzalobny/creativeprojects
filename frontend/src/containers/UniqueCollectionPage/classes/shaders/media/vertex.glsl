#define PI 3.1415926535897932384626433832795

precision highp float;
precision highp int;

uniform float uStrength;
uniform vec2 uViewportSizes;
uniform vec2 uPlaneSizes;
uniform vec3 uMouse3D;
uniform float uHovered;
uniform float uTime;
uniform float uRandom;
uniform float uFollow;

varying vec2 vUv;

void main() {

  vec3 stablePosition = position;
  
  //Parallax mouse animation
  stablePosition.x -= uMouse3D.x * 0.0002 * (1.5 * uRandom + .2) * uFollow;
  stablePosition.y -= uMouse3D.y * 0.0002 * (1.5 * uRandom + .2) * uFollow;

  // Cursor animation
  // float dist = distance(position.xy, uMouse3D.xy);
  // float area = 1.- smoothstep(0., 50., dist);
  // stablePosition.z += dist * 0.0005;

  vec4 newPosition = modelViewMatrix * vec4(stablePosition, 1.0);

  //Barrel animation 
  newPosition.z += sin(newPosition.y / uViewportSizes.y * PI + PI / 2.0) * -uStrength * 0.15;
  newPosition.z += sin(newPosition.x / uViewportSizes.x * PI + PI / 2.0) * -uStrength * 0.15;

  //Wave when hovered
  float elevation = sin(newPosition.x * 0.03  - uTime * 0.003) * 0.9;
  elevation += sin(newPosition.y * 0.01 - uTime * 0.002) * 0.7;
  newPosition.z += elevation * uHovered * uFollow;

  gl_Position = projectionMatrix * newPosition;

  vUv = uv;
}
