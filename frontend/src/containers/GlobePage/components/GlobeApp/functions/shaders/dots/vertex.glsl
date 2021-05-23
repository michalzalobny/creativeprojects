uniform float uSize;
uniform float uTime;
uniform float uPixelRatio;


void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = uSize * uPixelRatio;
    gl_PointSize *= (1.0/ - viewPosition.z);
}