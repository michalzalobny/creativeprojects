uniform float uTime;
uniform vec3 uMouse3D;
uniform float uScrollY;
uniform float uPixelRatio;
uniform vec2 uViewportSizes;
uniform float uPointSize;

attribute float aRandom;

varying vec2 vUv;


void main(){
    vec3 stablePosition = position;

    float dist = distance(position.xy, uMouse3D.xy);
    float area = 1.- smoothstep(0., 100., dist);

    stablePosition.x += 30.*sin(uTime *  aRandom * 0.1) * area ;
    stablePosition.y += 30.*cos(uTime *  aRandom * 0.1) * area ;
    stablePosition.z += 40.*cos(uTime *  aRandom * 0.1) * area ;

    vec4 modelPosition = modelMatrix * vec4(stablePosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = uPointSize * uViewportSizes.y * uPixelRatio;
    gl_PointSize *= (1.0/ - viewPosition.z);

    vUv = uv;
}