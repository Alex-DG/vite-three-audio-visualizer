import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import SoundReactor from './SoundReactor'
import VisualizerMaterial from './VisualizerMaterial'

class Experience {
  constructor(options) {
    this.scene = new THREE.Scene()
    this.group = new THREE.Group()
    this.clock = new THREE.Clock()
    this.container = options.domElement
    this.lastElapsedTime = 0
    this.deltaTime = 0

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
    this.setVisualizer()
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
      50,
      this.sizes.width / this.sizes.height,
      0.001,
      1000
    )
    this.camera.position.z = 90
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
  setVisualizer() {
    this.material = new VisualizerMaterial()
    const geometry = new THREE.PlaneBufferGeometry(128, 128, 64, 64)

    this.visualizer = new THREE.Mesh(geometry, this.material)
    this.visualizer.rotation.x = -Math.PI / 2 + Math.PI / 3
    this.visualizer.position.set(0, -5, 0)
    this.group.rotation.y = Math.PI * 0.15

    this.group.add(this.visualizer)
    this.scene.add(this.group)
  }
  setAudioController() {
    this.audioController = new SoundReactor()
  }
  setResize() {
    window.addEventListener('resize', this.resize)
  }

  //////////////////////////////////////////////////////////////////////////////

  updateTime() {
    this.elapsedTime = this.clock.getElapsedTime()
    this.deltaTime = this.elapsedTime - this.lastElapsedTime
    this.lastElapsedTime = this.elapsedTime
  }

  updateVisualizer() {
    if (this.audioController.isPlaying()) {
      // Update audio data
      this.audioController.update()
      const audioData = this.audioController.getAudioData()

      // Update visualizer material
      const { uTime, uDataArray } = this.material.uniforms
      uTime.value = this.elapsedTime
      uDataArray.value = audioData
    }

    // Update visualizer mesh
    if (this.visualizer) {
      const { position, rotation } = this.visualizer
      position.z = Math.sin(this.elapsedTime * 0.5) * 8
      rotation.y = Math.sin(this.elapsedTime) * 0.1
    }
  }

  update() {
    this.updateTime()
    this.updateVisualizer()

    this.controls.update()
    this.renderer.render(this.scene, this.camera)

    window.requestAnimationFrame(this.update)
  }
}

export default Experience
