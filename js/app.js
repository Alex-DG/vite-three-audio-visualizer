import '../styles/app.css'
import Experience from './Experience'

console.log('🎉', 'Project generated using vite-three-starter')
console.log(':: https://github.com/Alex-DG/vite-three-starter ::')

/**
 * Documentations
 */
document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>Audio Visualizer 🔉</h1>

    <figure class="audio-player">
      <audio id="audio-controller" controls>
      </audio>
     
      <div class="audio-select">
        <span class="audio-name">Pandrezz_Curtain_Call.mp4</span>
        <button class="select-btn">
          <h2>🗂️</h2>
        </button>

        <button class="reset-btn"><h2>🔁</h2></button>
      </div>
    </figure>
  </div>
`

/**
 * Experience
 */
window.experience = new Experience({
  domElement: document.getElementById('experience'),
})
