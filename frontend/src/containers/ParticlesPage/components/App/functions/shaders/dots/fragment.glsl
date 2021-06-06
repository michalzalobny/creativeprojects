varying vec2 vCoordinates;
varying vec3 vPos;

uniform float uAmount;
uniform sampler2D t1;
uniform sampler2D t2;
uniform sampler2D mask;
uniform float uCameraZ;

void main(){
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;
    strength = step(0.01, strength);
    vec4 maskTexture = texture2D(mask, gl_PointCoord);
    vec2 myUv = vec2(vCoordinates.x/uAmount, vCoordinates.y/uAmount);
    vec4 image = texture2D(t1, myUv);

    float alpha = 1. - clamp(abs(vPos.z / uCameraZ),0., 1.) + 0.5;

    gl_FragColor = image;
    gl_FragColor.a *= strength *alpha;
  }