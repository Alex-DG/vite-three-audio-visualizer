uniform float uTime;

varying float vX;
varying float vY;
varying float vZ;
// varying vec3 vUv;

uniform float uIntensity;

varying vec2 vUv;
varying float vDistort;
  
vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}    

void main() {
    float distort = vDistort * uIntensity;
    
    vec3 brightness = vec3(0.5, 0.5, 1.5);
    vec3 contrast = vec3(0.5, 0.5, 1.5);
    vec3 oscilation = vec3(1.0, 1.0, 1.0);
    vec3 phase = vec3(0.0, 0.12, 1.21);
    
    // vec3 brightness = vec3(0.5, 0.5, 0.5);
    // vec3 contrast = vec3(0.5, 0.5, 0.5);
    // vec3 oscilation = vec3(1.0, 1.0, 1.0);
    // vec3 phase = vec3(0.0, 0.1, 0.2);
  
    vec3 color = cosPalette(distort, brightness, contrast, oscilation, phase);
    
    gl_FragColor = vec4(color, 1.0);

  // float offset = 40.0;
  // gl_FragColor = vec4((offset - abs(vX)) / offset, (offset - abs(vY)) / offset, (abs(vX + vY) / 1.65) / offset, 1.0);
}