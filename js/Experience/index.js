import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import AudioController from './AudioController'
import VisualizerMaterial from './VisualizerMaterial'

class Experience {
  constructor(options) {
    this.scene = new THREE.Scene()
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
    this.setPlane()
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

    // Update plane
    // planeFitPerspectiveCamera(this.plane, this.camera, this.renderer.domElement)

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
  setPlane() {
    this.planeMaterial = new VisualizerMaterial()
    this.plane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(64, 64, 64, 64),
      this.planeMaterial
    )
    this.plane.rotation.x = -Math.PI / 2 + Math.PI / 3
    this.plane.position.set(0, -5, 0)
    this.scene.add(this.plane)
  }
  setAudioController() {
    this.audioController = new AudioController()
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
    if (this.planeMaterial) {
      // Update audio data
      this.audioController?.update()
      const dataArray = this.audioController?.getDataArray() // get audio data

      // Update plane material
      this.planeMaterial.uniforms.uTime.value = this.elapsedTime * 2
      this.planeMaterial.uniforms.uDataArray.value = dataArray

      // Update plane mesh
      this.plane.rotation.y = Math.sin(this.elapsedTime) * 0.025
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
