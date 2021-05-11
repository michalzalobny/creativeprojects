#define PI 3.1415926535897932384626433832795

precision highp float;
precision highp int;

uniform float uStrength;
uniform vec2 uViewportSizes;
uniform vec2 uPlaneSizes;

varying vec2 vUv;

void main() {

  // vec3 newPos = position;
  // newPosition.z += sin(newPos.y  * PI + PI / 2.0) * -uStrength;

  vec4 newPosition = modelViewMatrix * vec4(position, 1.0);
  newPosition.z += sin(newPosition.y / uViewportSizes.y * PI + PI / 2.0) * -uStrength;

  gl_Position = projectionMatrix * newPosition;

  vUv = uv;
}
