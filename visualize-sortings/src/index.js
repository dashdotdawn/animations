import 'minireset.css'
import './style.css'
import BarChart from './chart'
import { generateList } from './util'
import Simulation from './sort'

var data = []
var chart = new BarChart('canvas', 600, 450)
var simulation = new Simulation()

document.getElementById('generate')
.addEventListener('click', function () {
  let count = +document.getElementById('count').value
  data = generateList(count)
  chart.render(data)
})

document.getElementById('start')
.addEventListener('click', function () {
  if (!data.length) return alert('请点击「生成随机数组」')
  let type = document.getElementById('sort-type').value
  simulation.start(type, data, chart)
})

document.getElementById('stop')
.addEventListener('click', function () {
  simulation.stop()
})

document.getElementById('count')
.addEventListener('change', function (e) {
  let v = e.target.value
  if (v > 200) e.target.value = 200
  if (v < 10) e.target.value = 10
})
