import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import SoundReactor from './SoundReactor'
import { settings } from './utils/settings'
import VisualizerIcoMaterial from './VisualizerIcoMaterial'
import VisualizerPlaneMaterial from './VisualizerPlaneMaterial'

class Experience {
  constructor(options) {
    this.scene = new THREE.Scene()
    this.group = new THREE.Group()
    this.clock = new THREE.Clock()
    this.container = options.domElement
    this.lastElapsedTime = 0
    this.deltaTime = 0
    this.frameCount = 0
    this.scene.add(this.group)

    this.init()
  }

  /**
   * Experience setup
   */
  init() {
    this.bind()

    this.setSizes()
    this.setRenderer()
    this.setCamera()
    this.setAudioController()
    this.setVisualizerIco()
    this.setVisualizerPlane()
    this.setResize()

    this.update()

    console.log('🤖', 'Experience initialized')
  }

  bind() {
    this.resize = this.resize.bind(this)
    this.update = this.update.bind(this)
  }

  resize() {
    // Update sizes
    this.sizes.width = window.innerWidth
    this.sizes.height = window.innerHeight

    // Update camera
    this.camera.aspect = this.sizes.width / this.sizes.height
    this.camera.updateProjectionMatrix()

    // Update renderer
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  //////////////////////////////////////////////////////////////////////////////

  setSizes() {
    this.sizes = {
      width: this.container.offsetWidth,
      height: this.container.offsetHeight || window.innerHeight,
    }
  }
  setCamera() {
    // Base camera
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    )
    this.camera.position.z = 5
    this.scene.add(this.camera)

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
  }
  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.container.appendChild(this.renderer.domElement)
  }

  setVisualizerIco() {
    this.materialIco = new VisualizerIcoMaterial()
    const geometry = new THREE.IcosahedronBufferGeometry(1, 32)

    this.visualizerIco = new THREE.Mesh(geometry, this.materialIco)
    this.visualizerIco.position.set(0, -0.48, 0)

    this.group.add(this.visualizerIco)
  }

  setVisualizerPlane() {
    this.materialPlane = new VisualizerPlaneMaterial()
    const geometry = new THREE.PlaneBufferGeometry(128, 128, 64, 64)

    this.visualizerPlane = new THREE.Mesh(geometry, this.materialPlane)
    this.visualizerPlane.scale.set(0.1, 0.1, 0.1)
    this.visualizerPlane.rotation.x = -Math.PI / 2 + Math.PI / 3
    this.visualizerPlane.position.set(0, -1, -3)
    this.group.rotation.y = Math.PI * 0.15

    this.group.add(this.visualizerPlane)
  }

  setAudioController() {
    this.audioController = new SoundReactor()
  }

  setResize() {
    window.addEventListener('resize', this.resize)
  }

  //////////////////////////////////////////////////////////////////////////////

  updateTime() {
    this.frameCount += 1
    this.elapsedTime = this.clock.getElapsedTime()
    this.deltaTime = this.elapsedTime - this.lastElapsedTime
    this.lastElapsedTime = this.elapsedTime
  }

  updateVisualizerIco() {
    if (this.audioController.isPlaying()) {
      // Update audio data
      this.audioController.update()
      const dataArray = this.audioController.getAudioData()

      // Update visualizer material
      this.materialIco.uniforms.uDataArray.value = dataArray

      const { lowerMaxFrMod, upperAvgFrMod } =
        this.audioController.getAudioDataProcessed()

      this.materialIco.uniforms.uBassFr.value = lowerMaxFrMod
      this.materialIco.uniforms.uTreFr.value = upperAvgFrMod
    } else {
      this.materialIco.uniforms.uBassFr.value = 0
      this.materialIco.uniforms.uTreFr.value = 0
    }

    // Update visualizer mesh
    if (this.visualizerIco) {
      const { position, rotation } = this.visualizerIco
      position.z = Math.sin(this.elapsedTime * 0.5) * 0.5

      rotation.x = Math.sin(this.elapsedTime * 0.5) * 0.5
      rotation.y = Math.sin(this.elapsedTime * 0.5) * 0.5
      rotation.z = Math.sin(this.elapsedTime * 0.5) * 0.5

      // Update uniforms
      this.materialIco.uniforms.uTime.value = this.frameCount //this.elapsedTime
      this.materialIco.uniforms.uSpeed.value = settings.ico.speed
      this.materialIco.uniforms.uNoiseDensity.value = settings.ico.density
      this.materialIco.uniforms.uNoiseStrength.value = settings.ico.strength
      this.materialIco.uniforms.uFrequency.value = settings.ico.frequency
      this.materialIco.uniforms.uAmplitude.value = settings.ico.amplitude
      this.materialIco.uniforms.uIntensity.value = settings.ico.intensity
    }
  }

  updateVisualizerPlane() {
    if (this.audioController.isPlaying()) {
      // Update audio data
      this.audioController.update()
      const dataArray = this.audioController.getAudioData()

      // Update visualizer material
      const { uTime, uDataArray } = this.materialPlane.uniforms
      uTime.value = this.frameCount //this.elapsedTime
      uDataArray.value = dataArray
    }

    // Update visualizer mesh
    if (this.visualizerPlane) {
      const { rotation } = this.visualizerPlane
      rotation.y = Math.sin(this.elapsedTime * 0.5) * 0.1

      // Update uniforms
      this.materialPlane.uniforms.uTime.value = this.frameCount //this.elapsedTime
      this.materialPlane.uniforms.uAmplitude.value = settings.plane.amplitude
    }
  }

  update() {
    this.updateTime()
    this.updateVisualizerIco()
    this.updateVisualizerPlane()

    this.controls.update()
    this.renderer.render(this.scene, this.camera)

    window.requestAnimationFrame(this.update)
  }
}

export default Experience
