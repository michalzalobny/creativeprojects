uniform sampler2D uTexture;
uniform float uTime;

varying float vNoise;
varying vec2 vUv;

void main() {
  // vec3 color1 = vec3(1.0, 0.0, 0.0);
  // vec3 color2 = vec3(0.0, 0.0, 1.0);
  // vec3 finalColor = mix(color1, color2, vNoise);

  // gl_FragColor = vec4(finalColor, 1.0);

  vec2 vUvNew = vUv;

  float displacement = 0.05 * sin(vUvNew.y * 10. + uTime);

  vUvNew = vec2(vUvNew.x + displacement, vUvNew.y);

  vec4 textureColor = texture2D(uTexture, vUvNew);
  
  // gl_FragColor = vec4(vUv, 0., 1.0);
  gl_FragColor = vec4(vec3(vNoise), 1.0);
  
}