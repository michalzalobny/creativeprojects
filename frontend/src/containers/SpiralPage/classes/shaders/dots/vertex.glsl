uniform float uSize;
uniform float uTime;
uniform float uPixelRatio;
uniform vec3 uMouse3D;
uniform float uProgress;

attribute float aRandom;
attribute vec3 position2;

void main(){
    vec3 position2Copy = position2;

    //initial random animation
    position2Copy.x += 3.*sin(uTime * 0.001 * aRandom);
    position2Copy.y += 3.*cos(uTime * 0.001 * aRandom);
    position2Copy.z += 3.*cos(uTime * 0.001 * aRandom);

    vec3 stablePosition = mix(position, position2Copy, 1. - uProgress);

     //Parallax mouse animation
    stablePosition.x -= uMouse3D.x * 0.008;
    stablePosition.y -= uMouse3D.y * 0.008;

    // Cursor animation
    float dist = distance(position.xy, uMouse3D.xy);
    float area = 1.- smoothstep(0., 50., dist);
    stablePosition.z += dist * 0.1;

    stablePosition.x += 3.*sin(uTime * 0.001 * aRandom) * area;
    stablePosition.y += 3.*cos(uTime * 0.001 * aRandom) * area;
    stablePosition.z += 3.*cos(uTime * 0.001 * aRandom) * area;
    
    vec4 modelPosition = modelMatrix * vec4(stablePosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 newPosition = viewPosition;

    vec4 projectedPosition = projectionMatrix * newPosition;
    gl_Position = projectedPosition;
    gl_PointSize = uSize * uPixelRatio;
    gl_PointSize *= (1.0/ - viewPosition.z);
}