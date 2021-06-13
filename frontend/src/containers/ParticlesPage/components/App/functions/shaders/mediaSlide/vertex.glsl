uniform float uTime;
uniform vec3 uMouse3D;
uniform float uScrollY;
uniform float uPixelRatio;
uniform vec2 uViewportSizes;
uniform float uPointSize;
uniform float uSpeed;
uniform sampler2D uTouch;
uniform vec2 uTouchSizes;
uniform vec2 uPlaneSizes;

attribute float aRandom;

varying vec2 vUv;


void main(){
    vec3 stablePosition = position;

    
    // Dynamic texture animation
    vec2 ratio = vec2(
        min((uPlaneSizes.x / uPlaneSizes.y) / (uTouchSizes.x / uTouchSizes.y), 1.0),
        min((uPlaneSizes.y / uPlaneSizes.x) / (uTouchSizes.y / uTouchSizes.x), 1.0)
    );
    vec2 touchUv = vec2(
        uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
        uv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
    vec4 touchTexture = texture2D(uTouch, uv);
    stablePosition.x += touchTexture.r * aRandom * sin(uTime *  aRandom * 0.003);
    stablePosition.y += touchTexture.r * aRandom * cos(uTime *  aRandom * 0.002);
    stablePosition.z += touchTexture.r * aRandom * cos(uTime *  aRandom * 0.004);

    // Cursor animation
    float dist = distance(position.xy, uMouse3D.xy);
    // float area = 1.- smoothstep(0., 60., dist);
    // stablePosition.x += 30.*sin(uTime *  aRandom * 0.03) * area * (uSpeed * 0.001 * aRandom + 0.6 );
    // stablePosition.y += 30.*cos(uTime *  aRandom * 0.03) * area;
    // stablePosition.z += 40.*cos(uTime *  aRandom * 0.03) * area;
    stablePosition.z +=dist * 0.4;
    
    vec4 modelPosition = modelMatrix * vec4(stablePosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = uPointSize * uViewportSizes.y * uPixelRatio;
    gl_PointSize *= (1.0/ - viewPosition.z);

    vUv = uv;
}