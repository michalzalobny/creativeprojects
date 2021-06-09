precision highp float;

uniform vec2 uImageSizes;
uniform vec2 uPrevImageSizes;
uniform vec2 uPlaneSizes;
uniform float uProgress;
uniform sampler2D tMap;
uniform sampler2D tPrev;

varying vec2 vUv;

void main() {
  float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
  float strength = 0.05 / distanceToCenter - 0.1;
  strength = step(0.01, strength);

  vec2 ratio = vec2(
    min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
    min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
  );

  vec2 uv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  vec4 ttMain = texture2D(tMap, uv);

  vec2 ratioPrev = vec2(
    min((uPlaneSizes.x / uPlaneSizes.y) / (uPrevImageSizes.x / uPrevImageSizes.y), 1.0),
    min((uPlaneSizes.y / uPlaneSizes.x) / (uPrevImageSizes.y / uPrevImageSizes.x), 1.0)
  );

  vec2 uvPrev = vec2(
    vUv.x * ratioPrev.x + (1.0 - ratioPrev.x) * 0.5,
    vUv.y * ratioPrev.y + (1.0 - ratioPrev.y) * 0.5
  );

  vec4 ttSecond = texture2D(tPrev, uvPrev);

  vec4 final = mix(ttSecond ,ttMain, uProgress);

  gl_FragColor.rgb = final.rgb;
  gl_FragColor.a = strength;
}
