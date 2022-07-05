uniform float uTime;

varying float vX;
varying float vY;
varying float vZ;
varying vec3 vUv;

void main() {
  // gl_FragColor = vec4(mix(u_black, u_white, vUv.x), 1.0);

  // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  // if (vUv.x < 0.0) {
  //   gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
  // } else {
  //   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  // }
  // gl_FragColor = vec4(abs(sin(uTime * .001)), 0.0, 0.0, 1.0);
  gl_FragColor = vec4((32.0 - abs(vX)) / 32.0, (32.0 - abs(vY)) / 32.0, (abs(vX + vY) / 2.0) / 32.0, 1.0);
}


// void main() {
//   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
// }