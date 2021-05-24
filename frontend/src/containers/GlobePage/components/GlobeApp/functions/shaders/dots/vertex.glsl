uniform float uSize;
uniform float uTime;
uniform float uPixelRatio;
uniform float uElevation;

attribute float aRandom;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;

    vec4 newPosition = viewPosition;
    newPosition.z +=  abs(sin(uTime + aRandom * aRandom)) * 0.2 * uElevation;

    vec4 projectedPosition = projectionMatrix * newPosition;
    gl_Position = projectedPosition;
    gl_PointSize = uSize * uPixelRatio;
    gl_PointSize *= (1.0/ - viewPosition.z);
}