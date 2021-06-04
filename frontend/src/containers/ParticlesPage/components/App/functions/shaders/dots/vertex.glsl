uniform float uSize;
uniform float uTime;
uniform vec3 uMouse3D;

attribute float aRandom;

varying vec3 vPosition;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 newPosition = viewPosition;

    float distanceFromMouse = distance(uMouse3D.xy, position.xy );
    float final = 1. - step(0.1, distanceFromMouse);
    newPosition += final / 100.;

    // newPosition.x +=distanceToCenter;
    // newPosition.y +=distanceToCenter;
    // newPosition.z +=distanceToCenter;
    // newPosition.x += cos(uTime+ aRandom) * 0.01;
    // newPosition.y += sin(uTime+ aRandom) * 0.01;
    // newPosition.z += cos(uTime + aRandom) * 0.02;

    vec4 projectedPosition = projectionMatrix * newPosition;



    gl_Position = projectedPosition;
    gl_PointSize = uSize;
    gl_PointSize *= (1.0/ - viewPosition.z);

    vPosition = modelPosition.rgb;
}