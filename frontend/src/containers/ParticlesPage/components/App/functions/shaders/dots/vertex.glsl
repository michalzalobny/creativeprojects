uniform float uSize;
uniform float uTime;
uniform vec3 uMouse3D;
uniform float uTransitionProgress;
uniform float uScrollY;
uniform float uCameraZ;

attribute float aRandom;
attribute vec3 aCoordinates;
attribute float aSpeed;
attribute float aOffset;

varying vec2 vCoordinates;
varying vec3 vPos;


void main(){
    float depthMultiplier = 1.2;
    vec3 newPosition = position;
    newPosition.z += (mod(( aSpeed + aOffset + uScrollY ) , uCameraZ * 2. * depthMultiplier ) - uCameraZ * depthMultiplier ) * uTransitionProgress;
    newPosition.x += sin(uScrollY*aSpeed * 0.0003) * 5. * uTransitionProgress;

    vec3 stablePosition = position;

    newPosition.x += uMouse3D.x;
    newPosition.y += uMouse3D.y;
  
 
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = uSize;
    gl_PointSize *= (1.0/ - viewPosition.z);

    vCoordinates = aCoordinates.xy;    
    vPos = newPosition;
}