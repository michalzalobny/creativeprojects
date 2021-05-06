uniform float uPixelRatio;
uniform float uSize;
uniform float uTime;
uniform float uScale;

attribute float aScale;

void main()
{
     vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += sin(uTime * 0.35 + modelPosition.x * 100.0) * aScale * 0.3;
    modelPosition.x += cos(uTime * 0.35 + modelPosition.x * 100.0) * aScale * 0.3;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
    
    gl_PointSize = uSize * aScale * uPixelRatio * uScale * abs(sin(uTime * aScale));
    gl_PointSize *= (1.0 / - viewPosition.z);
}