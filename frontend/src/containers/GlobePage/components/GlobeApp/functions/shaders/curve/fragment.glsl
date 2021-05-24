varying vec2 vUv;
#define PI 3.1415926535897932384626433832795

uniform float uDistance;
uniform float uTime;

void main(){
  float dash = mod((vUv.x + uTime / uDistance / 10.0 ) * uDistance * 20.0, 1.0);
  dash = step(0.5, dash);
  gl_FragColor = vec4(1., 1., 1., dash);
}