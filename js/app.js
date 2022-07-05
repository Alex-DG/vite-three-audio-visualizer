import '../styles/app.css'
import Experience from './Experience'

console.log('🎉', 'Project generated using vite-three-starter')
console.log(':: https://github.com/Alex-DG/vite-three-starter ::')

const trackUrl =
  'https://open.spotify.com/track/5PwouDkiuNLlIBRvRWeAsE?si=3ab108548c6f43c7'

/**
 * Documentations
 */
document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>Audio Visualizer 🔉</h1>

    <figure class="audio-player">
      <audio id="audio-controller" controls>
      </audio>
      <a class="audio-name" href=${trackUrl} target="_blank">Pandrezz - Curtain Call</a>
    </figure>
  </div>
`

/**
 * Experience
 */
window.experience = new Experience({
  domElement: document.getElementById('experience'),
})
