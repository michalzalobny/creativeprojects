varying vec2 vCoordinates;

uniform float uAmount;
uniform sampler2D t1;
uniform sampler2D t2;
uniform sampler2D mask;

void main(){
    vec4 maskTexture = texture2D(mask, gl_PointCoord);
    // float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    // float strength = 0.05 / distanceToCenter - 0.1;
    // strength = step(0.01, strength);
    vec2 myUv = vec2(vCoordinates.x/uAmount, vCoordinates.y/uAmount);
    vec4 image = texture2D(t2, myUv);

    gl_FragColor = image;
    gl_FragColor.a *= 1. - maskTexture.r;
  }