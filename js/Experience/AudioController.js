import audioSrc from '../../assets/audio/Pandrezz-Curtain Call-(144p).mp4'

class AudioController {
  constructor() {
    this.setElement()
    this.setAudioContext()
  }

  setElement() {
    this.audioElement = document.getElementById('audio-controller')

    this.audioElement.onloadstart = () => {
      this.audioElement.classList.add('disabled')
    }
    this.audioElement.onloadeddata = () => {
      this.audioElement.classList.remove('disabled')
    }

    this.audioElement.src = audioSrc
  }

  setAudioContext() {
    this.audioContext = new window.AudioContext()
    this.source = this.audioContext.createMediaElementSource(this.audioElement)
    this.analyser = this.audioContext.createAnalyser()
    this.source.connect(this.analyser)
    this.analyser.connect(this.audioContext.destination)
    this.analyser.fftSize = 1024
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount)
  }

  play() {
    this.audioElement.play()
  }

  pause() {
    this.audioElement.pause()
  }

  setPlayState(value) {
    this.isPlaying = value
  }

  isPlaying() {
    return !this.audioElement.paused
  }

  getDataArray() {
    return this.dataArray
  }

  update() {
    if (this.isPlaying()) {
      // console.log(this.dataArray)
      this.analyser?.getByteFrequencyData(this.dataArray)
    }
  }
}

export default AudioController
