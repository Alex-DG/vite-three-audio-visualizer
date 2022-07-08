export const fractionate = (val, minVal, maxVal) => {
  return (val - minVal) / (maxVal - minVal)
}

export const modulate = (val, minVal, maxVal, outMin, outMax) => {
  var fr = fractionate(val, minVal, maxVal)
  var delta = outMax - outMin
  return outMin + fr * delta
}

export const avg = (arr) => {
  var total = arr?.reduce(function (sum, b) {
    return sum + b
  })
  return total / arr?.length
}

export const max = (arr) => {
  return arr?.reduce(function (a, b) {
    return Math.max(a, b)
  })
}
