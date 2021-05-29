varying vec2 vUv;

void main(){
  float strength = 1. - (abs(length(vec2(vUv.x - 0.49,vUv.y - 0.51)) - 0.375) * 35.0);
  gl_FragColor = vec4(148./255., 142./255.,244./255., strength );
}