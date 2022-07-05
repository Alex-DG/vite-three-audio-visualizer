uniform float uTime;

varying float vX;
varying float vY;
varying float vZ;
varying vec3 vUv;

void main() {
  float offset = 24.0;
  gl_FragColor = vec4((offset - abs(vX)) / offset, (offset - abs(vY)) / offset, (abs(vX + vY) / 1.65) / offset, 1.0);
}