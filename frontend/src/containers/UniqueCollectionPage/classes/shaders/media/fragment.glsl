precision highp float;

uniform float uOpacity;
uniform vec2 uPlaneSizes;
uniform vec2 uImageSizes;
uniform sampler2D tMap;
uniform vec2 uImageSizesBack;
uniform sampler2D tMapBack;


varying vec2 vUv;

void main() {
  vec2 ratio = vec2(
    min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
    min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
  );

  vec2 uv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  vec4 tFront = texture2D(tMap, uv);

  vec2 ratioBack = vec2(
    min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizesBack.x / uImageSizesBack.y), 1.0),
    min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizesBack.y / uImageSizesBack.x), 1.0)
  );

  vec2 uvBack = vec2(
    abs(1. - (vUv.x * ratioBack.x + (1.0 - ratioBack.x) * 0.5)),
    vUv.y * ratioBack.y + (1.0 - ratioBack.y) * 0.5
  );

  vec4 tBack = texture2D(tMapBack, uvBack);


  if(gl_FrontFacing) {
    gl_FragColor.rgb = tFront.rgb;
  } else {
    gl_FragColor.rgb = tBack.rgb;
  }

  gl_FragColor.a = uOpacity;
}
