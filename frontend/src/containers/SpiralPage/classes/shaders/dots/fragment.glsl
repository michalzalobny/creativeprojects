varying float vRandom;

void main(){
    gl_FragColor = vec4(250./255. * vRandom, 155./255. * vRandom, 255./255. * vRandom,  vRandom);
  }