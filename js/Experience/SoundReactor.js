import audioSrc from '../../assets/audio/Pandrezz_Curtain_Call.mp4'
import { audioFileImport, audioNameUpdate } from './utils/file'

class SoundReactor {
  constructor() {
    this.dataArray = new Uint8Array([0])
    this.playing = false

    this.bind()
    this.init()
  }

  bind() {
    this.onSelectAudioFile = this.onSelectAudioFile.bind(this)
  }

  init() {
    this.setAudioController()
    this.setAudioImport()
  }

  onSelectAudioFile(files) {
    console.log(files)

    if (!files?.length) return

    try {
      const file = files[0]
      audioNameUpdate(file?.name || '')

      // Create a blob that we can use as an src for our audio element
      const urlObj = URL.createObjectURL(file)
      console.log({ file })
      const cleanUp = () => {
        URL.revokeObjectURL(urlObj)
      }
      // Clean up the URL Object after we are done with it
      this.audioElement.addEventListener('load', cleanUp)
      // Set the new audio as a source of our audio controller
      this.audioElement.src = urlObj

      this.play() // 🔉

      this.audioElement.removeEventListener('load', cleanUp)
    } catch (error) {
      console.error({ error })
      alert(error.message)
    }
  }

  setAudioController() {
    this.audioElement = document.getElementById('audio-controller')

    this.audioElement.onplay = () => {
      this.setupAudioContext()
    }
    this.audioElement.onloadstart = () => {
      this.audioElement.classList.add('disabled')
    }
    this.audioElement.onloadeddata = () => {
      this.audioElement.classList.remove('disabled')
    }

    this.audioElement.src = audioSrc
  }

  /**
   * WIP
   */
  setAudioImport() {
    const selectFile = () => audioFileImport(this.onSelectAudioFile)
    this.audioSelect = document.querySelector('.select-btn')
    this.audioSelect.addEventListener('click', selectFile)
  }

  setupAudioContext() {
    if (this.audioContext) return

    this.audioContext = new AudioContext()

    this.source = this.audioContext.createMediaElementSource(this.audioElement)

    this.analyser = this.audioContext.createAnalyser()
    this.analyser.smoothingTimeConstant = 0.8

    this.source.connect(this.analyser)
    this.analyser.connect(this.audioContext.destination)

    this.analyser.fftSize = 1024

    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount)
  }

  play() {
    this.setPlayState(true)
    this.audioElement?.play()
  }

  pause() {
    this.setPlayState(false)
    this.audioElement?.pause()
  }

  setPlayState(value) {
    this.playing = value
  }

  isPlaying() {
    this.setPlayState(!this.audioElement?.paused)
    return this.playing
  }

  getAudioData() {
    return this.dataArray
  }

  update() {
    if (this.isPlaying()) {
      this.analyser?.getByteFrequencyData(this.dataArray)
    }
  }
}

export default SoundReactor
