#define PI 3.1415926535897932384626433832795

precision highp float;
precision highp int;

uniform float uStrength;
uniform vec2 uViewportSizes;
uniform vec2 uPlaneSizes;

varying vec2 vUv;

void main() {


  vec4 newPosition = modelViewMatrix * vec4(position, 1.0);
  newPosition.y += sin(newPosition.x / uViewportSizes.x * PI + PI / 2.0) * -uStrength * 200.;

  vec3 newPos = position;
  // newPosition.z += sin(newPos.x  * PI + PI / 2.0) * -uStrength;

  newPosition.x += sin(newPos.y  * PI + PI / 2.0) * -uStrength * 80.;
  newPosition.y += sin(newPos.x  * PI + PI / 2.0) * abs(-uStrength) * 30.;

  gl_Position = projectionMatrix * newPosition;

  vUv = uv;
}
