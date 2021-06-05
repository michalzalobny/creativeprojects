uniform float uSize;
uniform float uTime;
uniform vec3 uMouse3D;

attribute float aRandom;
attribute vec3 aCoordinates;

varying vec2 vCoordinates;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 newPosition = viewPosition;

    vec4 projectedPosition = projectionMatrix * newPosition;

    gl_Position = projectedPosition;
    gl_PointSize = uSize;
    gl_PointSize *= (1.0/ - viewPosition.z);

    vCoordinates = aCoordinates.xy;    
}