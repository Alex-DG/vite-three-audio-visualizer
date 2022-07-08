import { ShaderMaterial, AdditiveBlending } from 'three'

import vertexShader from './shaders/visualizerIco/vertex.glsl'
import fragmentShader from './shaders/visualizerIco/fragment.glsl'
import { settings } from './utils/settings'

class VisualizerIcoMaterial extends ShaderMaterial {
  constructor() {
    super({
      wireframe: true,
      uniforms: {
        uTime: { value: 0.0 },
        uBassFr: { value: 0 },
        uTreFr: { value: 0 },
        uDataArray: { value: new Uint8Array([0]) },

        uSpeed: { value: settings.ico.speed },
        uNoiseDensity: { value: settings.ico.density },
        uNoiseStrength: { value: settings.ico.strength },
        uFrequency: { value: settings.ico.frequency },
        uAmplitude: { value: settings.ico.amplitude },
        uIntensity: { value: settings.ico.intensity },
      },
      vertexShader,
      fragmentShader,
    })
  }
}

export default VisualizerIcoMaterial
