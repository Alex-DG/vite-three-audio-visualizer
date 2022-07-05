uniform float uTime;
uniform float uAmplitude;
uniform float[64] uDataArray;

varying float vX;
varying float vY;
varying float vZ;
varying vec3 vUv;

void main() {
    float x = abs(position.x);
    float y = abs(position.y);

    float floorX = round(x);
    float floorY = round(y);

    float xMultiplier = (32.0 - x) / 8.0;
    float yMultiplier = (32.0 - y) / 8.0;

    float z = sin(uDataArray[int(floorX)] / 50.0 + uDataArray[int(floorY)] / 50.0) * uAmplitude;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, z, 1.0);

    vUv = position;
    vX = x;
    vY = y;
    vZ = z;
}