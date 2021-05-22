varying vec2 vUv;
#define PI 3.1415926535897932384626433832795

uniform float uDistance;

void main(){
  float dash = mod(vUv.x * uDistance * 20.0, 1.0);
  dash = step(0.5, dash);

  gl_FragColor = vec4(1., 1., 0., dash);
}