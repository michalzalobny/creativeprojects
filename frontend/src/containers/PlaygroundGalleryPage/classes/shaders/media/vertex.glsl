#define PI 3.1415926535897932384626433832795

precision highp float;
precision highp int;

uniform float uStrength;
uniform vec2 uViewportSizes;
uniform vec2 uPlaneSizes;
uniform vec3 uMouse3D;
uniform float uTime;
uniform float uRandom;
uniform float uRandomSign;


varying vec2 vUv;

void main() {

  vec3 stablePosition = position;
  
  //Parallax mouse animation
  // stablePosition.x -= uMouse3D.x * 0.0002 * (1.5 * uRandom + .2) ;
  // stablePosition.y -= uMouse3D.y * 0.0002 * (1.5 * uRandom + .2) ;

  // Cursor animation
  // float dist = distance(position.xy, uMouse3D.xy);
  // float area = 1.- smoothstep(0., 50., dist);
  // stablePosition.z += dist * 0.0005;

  vec4 newPosition = modelViewMatrix * vec4(stablePosition, 1.0);

  newPosition.z += sin(stablePosition.x  * PI * 0.5 * uRandomSign+ PI / 3.0) * abs(uStrength) * uRandomSign * 0.8;
  newPosition.y += sin(uTime * 0.001 * (uRandom + 1.) * 0.5)  * uRandomSign * 12. ;

  newPosition.z += sin(stablePosition.x *1.5 * PI + PI / 2.0 + uTime * 0.0008 * uRandomSign * (uRandom+ 1.) * 0.5)  * 20. * uRandomSign;

  gl_Position = projectionMatrix * newPosition;

  vUv = uv;
}
