uniform float uSize;
uniform float uTime;
uniform vec3 uMouse3D;
uniform float uTransitionProgress;
uniform float uScrollY;
uniform float uCameraZ;
uniform float uScreenWidth;
uniform float uScreenHeight;
uniform float uPixelRatio;

attribute float aRandom;
attribute vec3 aCoordinates;
attribute float aSpeed;
attribute float aOffset;
attribute float aDirection;
attribute float aPress;

varying vec2 vCoordinates;
varying vec3 vPos;


void main(){
    float depthMultiplier = 1.2;
    vec3 newPosition = position;
    newPosition.z += (mod(( aSpeed + aOffset + uScrollY ) , uCameraZ * 2. * depthMultiplier ) - uCameraZ * depthMultiplier ) * uTransitionProgress;
    newPosition.x += sin(uScrollY*aSpeed * 0.0003) * 5. * uTransitionProgress;

    vec3 stablePosition = position;

    float dist = distance(position.xy, uMouse3D.xy);
    float area = 1.- smoothstep(0., 100., dist);

    stablePosition.x += 50.*sin(0.01 * uTime * aOffset) * aDirection * area;
    stablePosition.y += 50.*cos(0.01 * uTime * aOffset) * aDirection * area;
    stablePosition.z += 200.*cos(0.01 * uTime * aOffset) * aDirection * area;

    newPosition.x += uMouse3D.x;
    newPosition.y += uMouse3D.y;

    vec4 modelPosition = modelMatrix * vec4(stablePosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = uSize * uScreenHeight * uPixelRatio;
    gl_PointSize *= (1.0/ - viewPosition.z);

    vCoordinates = aCoordinates.xy;    
    vPos = newPosition;
}