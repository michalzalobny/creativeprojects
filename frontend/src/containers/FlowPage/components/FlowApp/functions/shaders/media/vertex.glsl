#define PI 3.1415926535897932384626433832795

precision highp float;
precision highp int;





uniform float uStrength;
uniform vec2 uViewportSizes;

varying vec2 vUv;

void main() {
  vec4 newPosition = modelViewMatrix * vec4(position, 1.0);

  newPosition.z += sin(newPosition.y / uViewportSizes.y * PI + PI / 2.0) * -uStrength;

  vUv = uv;

  gl_Position = projectionMatrix * newPosition;
}
