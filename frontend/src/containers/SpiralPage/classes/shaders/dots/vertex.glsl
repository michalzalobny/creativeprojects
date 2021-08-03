uniform float uSize;
uniform float uTime;
uniform float uPixelRatio;
uniform vec3 uMouse3D;

attribute float aRandom;

void main(){
    vec3 stablePosition = position;
    
    //Parallax mouse animation
    stablePosition.x -= uMouse3D.x * 0.004;
    stablePosition.y -= uMouse3D.y * 0.004;

    // Cursor animation
    float dist = distance(position.xy, uMouse3D.xy);
    float area = 1.- smoothstep(0., 40., dist);
    stablePosition.z += dist * 0.1;

    stablePosition.x += 4.*sin(uTime * 0.001 * aRandom) * area ;
    stablePosition.y += 4.*cos(uTime * 0.001 * aRandom) * area ;
    stablePosition.z += 4.*cos(uTime * 0.001 * aRandom) * area;
    

    vec4 modelPosition = modelMatrix * vec4(stablePosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 newPosition = viewPosition;

    vec4 projectedPosition = projectionMatrix * newPosition;
    gl_Position = projectedPosition;
    gl_PointSize = uSize * uPixelRatio;
    gl_PointSize *= (1.0/ - viewPosition.z);
}