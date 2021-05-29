varying vec2 vUv;
#define PI 3.1415926535897932384626433832795



void main(){
  // float strength = abs(length(vUv - 0.5) - 0.5) * 2.0;
  float strength = 1. - (abs(length(vec2(vUv.x - 0.5,vUv.y - 0.5)) - 0.44) * 9.);
  // gl_FragColor = vec4(33./255., 104./255.,145./255., strength * 0.6);
  gl_FragColor = vec4(0., 0., 0., strength * 0.5);
}