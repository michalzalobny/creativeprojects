void main(){
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;
    strength = step(0.01, strength);
    gl_FragColor = vec4(219./255., 198./255., 141./255., strength);
  }