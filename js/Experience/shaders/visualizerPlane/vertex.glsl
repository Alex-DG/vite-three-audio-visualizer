uniform float uTime;
uniform float uAmplitude;
uniform float[64] uDataArray;

varying vec2 vUv;

void main() {
    float x = abs(position.x);
    float y = abs(position.y);

    float floorX = round(x);
    float floorY = round(y);

    float positionZ = sin(uDataArray[int(floorX*0.25)] / 50.0 + uDataArray[int(floorY)] / 50.0) * uAmplitude; // * (uv.x) + uv.x;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xy, positionZ, 1.0);
   
    vUv = uv;
}