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
