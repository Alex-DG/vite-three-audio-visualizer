import audioDefaultSrc from '../../../assets/audio/Pandrezz_Curtain_Call.mp4'

const DEFAULT_AUDIO_NAME = 'Pandrezz_Curtain_Call.mp4'

export const audioFileImport = (callback) => {
  let input = document.createElement('input')
  input.type = 'file'
  input.onchange = (_) => {
    const files = Array.from(input.files)
    callback(files)
  }
  input.click()
}

export const audioNameUpdate = (name) => {
  const nameDom = document.querySelector('.audio-name')
  nameDom.innerText = name
}

export const audioReset = (audioElement, callback) => {
  const nameDom = document.querySelector('.audio-name')
  const resetBtn = document.querySelector('.reset-btn')

  const shouldReset = audioElement && nameDom.innerText !== DEFAULT_AUDIO_NAME
  if (shouldReset) {
    nameDom.innerText = DEFAULT_AUDIO_NAME
    resetBtn.style.opacity = '0'
    audioElement.src = audioDefaultSrc
    callback()
  }
}
