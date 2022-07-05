import { ShaderMaterial, AdditiveBlending } from 'three'

import vertexShader from './shaders/visualizer/vertex.glsl'
import fragmentShader from './shaders/visualizer/fragment.glsl'

class VisualizerMaterial extends ShaderMaterial {
  constructor() {
    super({
      wireframe: true,
      uniforms: {
        uTime: { value: 0.0 },
        uDataArray: { value: new Uint8Array([0]) },
        uAmplitude: { value: 6.0 },
      },
      vertexShader,
      fragmentShader,
    })
  }
}

export default VisualizerMaterial
