import 'minireset.css'
import './style.css'
import LowPoly from './lowpoly'

var canvas = document.getElementById('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

var reader = new FileReader()
var image = new Image()
var lowpolyImage
image.src = './src/rose.jpg'


var resize = function() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  lowpolyImage.resize()  
}
window.onresize = function() {
  // debounce
  clearTimeout(resize.tid)
  resize.tid = setTimeout(function() {
    resize()
  }, 300)
}
reader.onload = function (e) {
  image.src = e.target.result
}
image.onload = function () {
  lowpolyImage = new LowPoly(image, canvas)
}

var filename = 'picture'
document.getElementById('file').onchange = function (e) {
  if (this.files[0]) {
    filename = this.files[0].name
    reader.readAsDataURL(this.files[0])
  }
}

var link = document.createElement('a')
document.getElementById('download').onclick = function () {
  let url = canvas.toDataURL()
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.click()
}

