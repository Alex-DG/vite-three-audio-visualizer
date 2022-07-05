export const getViewSize = (camera) => {
  const fovInRadians = (camera.fov * Math.PI) / 180
  const height = Math.abs(camera.position.z * Math.tan(fovInRadians / 2) * 2)
  return { width: height * camera.aspect, height }
}

export const planeFitPerspectiveCamera = (plane, camera, canvas) => {
  const rect = canvas.getBoundingClientRect()
  const viewSize = getViewSize(camera)

  if (rect) {
    // Transform pixel units to camera's view units
    const widthViewUnit = (rect.width * viewSize.width) / window.innerWidth
    const heightViewUnit = (rect.height * viewSize.height) / window.innerHeight

    const offset = 0 //25
    plane.scale.x = widthViewUnit - offset
    plane.scale.y = heightViewUnit - offset
  }
}
