const kernalLaplace = [
  [1, 1, 1],
  [1, -8, 1],
  [1, 1, 1]
]
const kernalX = [
  [-1, 0, 1],
  [-2, 0, 2],
  [-1, 0, 1]
]
const kernalY = [
  [-1, -2, -1],
  [0, 0, 0],
  [1, 2, 1]  
]
var data, w, h
var Sobel = {
  trans: function(grayData, width, height) {
    data = grayData
    w = width
    h = height
    var sobelData = new Uint8ClampedArray(w * h)
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        let d = covolution(x, y)
        sobelData[y * w + x]= d
      }
    }
    return sobelData
  }
}

function dataAt(x, y) {
  if (x < 0) x = 0
  if (y < 0) y = 0
  if (x >= w) x = w - 1
  if (y >= h) y = h - 1
  return data[y * w + x]
}

function covolution(x, y) {
  let gx = 
    kernalX[0][0] * dataAt(x - 1, y - 1) +
    kernalX[0][1] * dataAt(x - 1, y) +
    kernalX[0][2] * dataAt(x - 1, y + 1) +
    kernalX[1][0] * dataAt(x, y - 1) +
    kernalX[1][1] * dataAt(x, y) +
    kernalX[1][2] * dataAt(x, y + 1) +
    kernalX[2][0] * dataAt(x + 1, y - 1) +
    kernalX[2][1] * dataAt(x + 1, y) +
    kernalX[2][2] * dataAt(x + 1, y + 1)
  let gy =
    kernalY[0][0] * dataAt(x - 1, y - 1) +
    kernalY[0][1] * dataAt(x - 1, y) +
    kernalY[0][2] * dataAt(x - 1, y + 1) +
    kernalY[1][0] * dataAt(x, y - 1) +
    kernalY[1][1] * dataAt(x, y) +
    kernalY[1][2] * dataAt(x, y + 1) +
    kernalY[2][0] * dataAt(x + 1, y - 1) +
    kernalY[2][1] * dataAt(x + 1, y) +
    kernalY[2][2] * dataAt(x + 1, y + 1)

  return (Math.sqrt(gx * gx + gy * gy) >> 0) // math.floor
}

export { Sobel }
