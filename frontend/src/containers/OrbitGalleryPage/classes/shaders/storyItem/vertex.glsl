#define PI 3.1415926535897932384626433832795

precision highp float;
precision highp int;

uniform float uStrength;
uniform vec2 uViewportSizes;
uniform vec2 uPlaneSizes;
uniform vec3 uMouse3D;

varying vec2 vUv;

void main() {

  vec3 stablePosition = position;
  
  //Parallax mouse animation
  // stablePosition.x -= uMouse3D.x * 0.0009;
  // stablePosition.y -= uMouse3D.y * 0.0009;

  // Cursor animation
  // float dist = distance(position.xy, uMouse3D.xy);
  // float area = 1.- smoothstep(0., 30., dist);
  // stablePosition.z += dist * 0.1;

  vec4 newPosition = modelViewMatrix * vec4(stablePosition, 1.0);

  //Barrel animation 
  newPosition.z += sin(newPosition.y / uViewportSizes.y * PI + PI / 2.0) * -uStrength * 0.15;
  newPosition.z += sin(newPosition.x / uViewportSizes.x * PI + PI / 2.0) * -uStrength * 0.15;

  gl_Position = projectionMatrix * newPosition;

  vUv = uv;
}
