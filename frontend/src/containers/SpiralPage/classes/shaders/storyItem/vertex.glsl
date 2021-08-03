#define PI 3.1415926535897932384626433832795

precision highp float;
precision highp int;

uniform float uStrength;
uniform vec2 uViewportSizes;
uniform vec2 uPlaneSizes;

varying vec2 vUv;

void main() {
  vec4 newPosition = modelViewMatrix * vec4(position, 1.0);
  vec3 newPos = position;

  newPosition.x += sin(newPosition.y / uPlaneSizes.y * 0.9 * PI + PI / 2.0) * uStrength * 5.;
  newPosition.y += sin(newPosition.x / uPlaneSizes.x * 0.9 * PI + PI / 2.0) * uStrength * 15.;

  newPosition.x += sin(newPos.y * PI + PI / 2.0) * abs(uStrength)  * newPosition.x;
  newPosition.y += sin(newPos.x * PI + PI / 2.0) * abs(uStrength)  * newPosition.y;

  gl_Position = projectionMatrix * newPosition;

  vUv = uv;
}
