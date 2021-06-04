varying vec3 vPosition;

void main(){
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;
    strength = step(0.01, strength);

    float depth = vPosition.z *0.5 + 0.5;

    vec3 color1 = vec3(54./255., 203./255., 245./255.);
    vec3 color2 = vec3(245./255., 54./255., 229./255.);
    vec3 color = mix(color1,color2,depth);

 
    
    gl_FragColor = vec4(1.,1.,0., strength);
  }