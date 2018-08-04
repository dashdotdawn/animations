import { randomInt } from './util'

export default class BarChart {
  constructor(el, width, height) {
    this.canvas = document.getElementById(el)
    Bar.ctx = this.ctx = this.canvas.getContext('2d')

    this.bgWidth = width
    this.bgHeight = height
    this.paddingX = Math.round(width / 10) 
    this.paddingY = Math.round(height / 10) 
    this.axisX = width - this.paddingX * 2
    this.axisY = height - this.paddingY * 2
    this.bars = []
    
    // init
    this.canvas.width = this.bgWidth
    this.canvas.height = this.bgHeight
    this.draw()
  }
  render(data) {
    this._saveUnitY(data)
    this.bars = this._generateBar(data)
    this.draw()
  }
  rerender(data) {
    this.bars = this._generateBar(data, 'black')
    this.draw()
  }
  swapBar(i, j) {
    let a = this.bars[i]
    let b = this.bars[j]
    
    let tempX = a.x
    a.x = b.x
    b.x = tempX
    this.bars[i] = b
    this.bars[j] = a
  }
  draw() {
    // 背景
    this.ctx.fillStyle = 'wheat'
    this.ctx.fillRect(0, 0, this.bgWidth, this.bgHeight)

    // 坐标轴
    this.ctx.beginPath()
    this.ctx.moveTo(this.paddingX, this.paddingY)
    this.ctx.lineTo(this.paddingX, this.axisY + this.paddingY)
    this.ctx.lineTo(this.paddingX + this.axisX, this.axisY + this.paddingY)
    this.ctx.stroke()
    this.ctx.closePath()
    // 柱形图
    this.bars.forEach(b => {
      b.draw()
    })
  }
  _generateBar(data, color) {
    var bars = []
    let len = data.length
    let perBar = +(this.axisX / len).toFixed(2)
    let gutter = +(perBar / 1.4 * 0.2).toFixed(2)
    let bar = perBar - gutter * 2

    for (let i = 0; i < len; i++) {
      let h = this.unitY * data[i]
      let y = this.paddingY + this.axisY - h
      let x = this.paddingX + gutter + i * perBar
      let b = new Bar(x, y, bar, h, color)
      bars.push(b)
    }
    return bars
  }
  _saveUnitY(data) {
    // 防止 merge 重绘过程中产生抖动
    let max = Math.max(...data)
    let unitY = this.axisY * 0.9 / max
    this.unitY = unitY
  }
}

class Bar {
  constructor(x, y, width, height, color) {
    this.tx = this.x = x
    this.ty = this.y = y
    this.height = height
    this.width = width
    this.color = color || `rgba(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)}, 0.7)`
  }
  draw() {
    Bar.ctx.fillStyle = this.color
    Bar.ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

