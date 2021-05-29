varying vec2 vUv;
#define PI 3.1415926535897932384626433832795



void main(){
  float strength = abs(length(vUv - 0.5) - 0.45) * 2.0;
  // float strength = 1. - (abs(length(vUv - 0.5) - 0.38) * 10.0);
  gl_FragColor = vec4(vUv, 1.0, strength);
}