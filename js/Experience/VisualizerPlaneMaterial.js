import { ShaderMaterial, AdditiveBlending } from 'three'

import vertexShader from './shaders/visualizerPlane/vertex.glsl'
import fragmentShader from './shaders/visualizerPlane/fragment.glsl'
import { settings } from './utils/settings'

class VisualizerPlaneMaterial extends ShaderMaterial {
  constructor() {
    super({
      wireframe: true,
      uniforms: {
        uTime: { value: 0.0 },
        uDataArray: { value: new Uint8Array([0]) },
        uAmplitude: { value: settings.plane.amplitude },
      },
      vertexShader,
      fragmentShader,
    })
  }
}

export default VisualizerPlaneMaterial
