import Delaunay from './delaunay'
import { Sobel } from './sobel'

export default class LowPoly {
  constructor(image, canvas, cb) {
    this.image = image
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')

    this.getImageData()
    this.getSobelData()
    this.render()
  }
  resize() {
    this.getImageData()
    this.getSobelData()
    this.render()
  }
  getImageData() {
    let w = this.canvas.width
    let h = this.canvas.height

    let nWidth = this.image.naturalWidth
    let nHeight = this.image.naturalHeight
    let ratio = Math.min(w / nWidth, h / nHeight)

    this.width = Math.floor(nWidth * ratio)
    this.height = Math.floor(nHeight * ratio)
    this.posX = Math.floor(w - this.width) / 2
    this.posY = Math.floor(h - this.height) / 2

    this.ctx.clearRect(0, 0, w, h)
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    this.inputData = this.ctx.getImageData(this.posX, this.posY, this.width, this.height).data
  }
  getSobelData() {
    let pixels = this.width * this.height * 4
    let grayScaleData = new Uint8ClampedArray(pixels)
    for (var i = 0; i < pixels; i += 4) {
      let color = Math.round(0.299 * this.inputData[i] + 0.587 * this.inputData[i + 1] + 0.114* this.inputData[i + 2])
      // let color = Math.round((this.inputData[i] + this.inputData[i + 1] + this.inputData[i + 2]) / 3)
      grayScaleData[i / 4] = color
    }
    this.sobelData = Sobel.trans(grayScaleData, this.width, this.height)
  }
  getVertices() {
    var vertices = [
      [0, 0],
      [this.width, 0],
      [0, this.height],
      [this.width, this.height]
    ]
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        let i = this.width * y + x
        let data = this.sobelData[i]

        if (data > 200) {
          if (Math.random() > 0.95) vertices.push([x, y])
        } else if (data > 100) {
          if (Math.random() > 0.98) vertices.push([x, y])
        } else if (data > 40) {
          if (Math.random() > 0.98) vertices.push([x, y])
        } else {
          if (Math.random() > 0.999) vertices.push([x, y])
        }
      }
    }
    return vertices
  }
  render() {
    var vertices = this.getVertices()
    console.log('vertices', vertices.length)

    var triangles = Delaunay.triangulate(vertices)
    for (var i = 0; i < triangles.length; i += 3) {

      let x = triangles[i]
      let y = triangles[i + 1]
      let z = triangles[i + 2]

      this.ctx.beginPath()
      this.ctx.moveTo(vertices[x][0] + this.posX, vertices[x][1] + this.posY)
      this.ctx.lineTo(vertices[y][0] + this.posX, vertices[y][1] + this.posY)
      this.ctx.lineTo(vertices[z][0] + this.posX, vertices[z][1] + this.posY)
      this.ctx.closePath()

      let center = [
        Math.floor((vertices[x][0] + vertices[y][0] + vertices[z][0]) / 3),
        Math.floor((vertices[x][1] + vertices[y][1] + vertices[z][1]) / 3)
      ]

      var index = (center[1] * this.width + center[0]) * 4
      this.ctx.fillStyle = `rgba(${this.inputData[index]}, ${this.inputData[index + 1]}, ${this.inputData[index + 2]}, ${this.inputData[index + 3]}`
      this.ctx.fill()
    }
  }
}