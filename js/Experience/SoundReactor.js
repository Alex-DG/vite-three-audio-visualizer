import audioSrc from '../../assets/audio/Pandrezz_Curtain_Call.mp4'

class SoundReactor {
  constructor() {
    this.dataArray = new Uint8Array([0])
    this.playing = false

    this.init()
  }

  init() {
    this.setElement()
  }

  setElement() {
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
