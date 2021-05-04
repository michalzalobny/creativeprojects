
#pragma glslify: noise = require('glsl-noise/simplex/2d')
precision mediump float;

uniform vec3 uColor;
uniform vec3 uColorShadow;
uniform float uProgress;


varying vec2 vUv;

void main () {
    vec4 topColor = vec4(uColor, step((noise(vUv.xy*3.0) + 1.0) / 2.0, 1.0 - uProgress));
    vec4 bottomColor = vec4(uColorShadow, step((noise(vUv.xy*3.2) + 1.0) / 2.0, 1.0 - uProgress));
    gl_FragColor = mix(bottomColor, topColor, topColor.a);
}