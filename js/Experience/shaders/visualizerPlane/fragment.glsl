varying vec2 vUv;

void main() {
  gl_FragColor = vec4(vUv.y ,vUv.x, 1.0, 1.0);
}