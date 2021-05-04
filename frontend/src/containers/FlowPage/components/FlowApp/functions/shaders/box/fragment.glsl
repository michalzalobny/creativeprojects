varying float vNoise;

void main() {
  vec3 color1 = vec3(1.0, 0.0, 0.0);
  vec3 color2 = vec3(0.0, 0.0, 1.0);
  vec3 finalColor = mix(color1, color2, vNoise);
  gl_FragColor = vec4(finalColor, 1.0);
}