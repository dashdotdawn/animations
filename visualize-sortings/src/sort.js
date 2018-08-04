export default class Simulation {
  constructor() {
    this.running = false
    this._swap = this._swap.bind(this)
    this._rerender = this._rerender.bind(this)
  }
  start(type, data, chart) {
    this.running = true
    this.type = type
    this.data = data
    this.chart = chart
    let func = this.type === 'MERGE_SORT' ? this._rerender : this._swap
    SORTINGS[type](data, func)
  }
  stop() {
    this.running = false
  }
  updateChart() {
    let time = this.running ? 100 : 0
    return new Promise(resolve => {
      setTimeout(() => {
        this.chart.draw()
        resolve()
      }, time)
    })
  }
  _swap(i, j) {
    let temp = this.data[i]
    this.data[i] = this.data[j]
    this.data[j] = temp
    this.chart.swapBar(i, j)
    return this.updateChart()
  }
  _rerender() {
    this.chart.rerender(this.data)
    return this.updateChart()
  }
}

const SORTINGS = {
  SELECTION_SORT: async function selectionSort(data, Fn) {
    let len = data.length
    for (let i = 0; i < len; i++) {
      let minIndex = i
      for (let j = i; j < len; j++) {
        if (data[j] < data[minIndex]) minIndex = j
      }
      await Fn(i, minIndex)
    }
  },
  INSERT_SORT: async function insertSort(data, Fn) {
    let len = data.length
    for (let i = 1; i < len; i++) {
      for (let j = i; j > 0 && data[j] < data[j - 1]; j--) {
        await Fn(j - 1, j)
      }
    }
  },
  SHELL_SORT: async function shellSort(data, Fn) {
    let gap = 1
    let len = data.length
    while(3 * gap + 1 < len) gap = 3 * gap + 1

    while (gap) {
      for (let i = gap; i < len; i++) {
        for (let j = i; j >= gap && data[j] < data[j - gap]; j -= gap) {
          await Fn(j - gap, j)
        }
      }
      gap = Math.floor(gap / 3)
    }
  },
  MERGE_SORT: function mergeSort(data, Fn) {
    sort(data, 0, data.length - 1)
    .then(() => {
      console.log(isSorted(data))
    })
    function isSorted(data) {
      for (var i = 1; i < data.length; i++) {
        if (data[i] < data[i - 1]) {
          return false
        }
      }
      return true
    }

    function sort(data, lo, hi) {
      if (lo >= hi) return Promise.resolve()
      let mid = Math.floor((lo + hi) / 2)
      return sort(data, lo, mid)
      .then(() => {
        return sort(data, mid + 1, hi)
      })
      .then(() => {
        return merge(data, lo, mid + 1, hi)
      })
    }

    async function merge(data, lo, mid, hi) {
      if (data[mid] > data[mid - 1]) return
      let aux = data.slice()
      let i = lo, j = mid
      for (let x = lo; x <= hi; x++) {
        let origin = data[x]
        if (j > hi) data[x] = aux[i++]
        else if (i >= mid) data[x] = aux[j++]
        else if (aux[i] > aux[j]) data[x] = aux[j++]
        else data[x] = aux[i++]
        await Fn()
      }
      return
    }
  },
  QUICK_SORT: function quickSort(data, Fn) {
    sort(data, 0, data.length - 1)

    function sort(data, lo, hi) {
      if (lo >= hi) return Promise.resolve()
      let j
      return partition(data, lo, hi)
      .then(index => {
        j = index
        return sort(data, lo, j - 1)
      })
      .then(() => {
        return sort(data, j + 1, hi)
      })

    }

    async function partition(data, lo, hi) {
      let k = data[lo]
      let i = lo, j = hi
      while (i < j) {
        while (data[i] <= k) {
          if (i >= hi) break
          i++
        }
        while (data[j] > k) {
          j--
        }
        if (i < j) {
          await Fn(i, j)
        }
      }
      await Fn(lo, j)
      return j
    }
  },
  HEAP_SORT: async function (data, Fn) {
    let len = data.length
    let i = Math.floor(len / 2)
    while (i) {
      await sink(i--, len)
    }

    let n = len
    while (n > 1) {
      await Fn(0, n - 1)
      await sink(1, --n)
    }
    
    async function sink(k, range) {
      while (k * 2 <= range) {
        let j = k * 2
        if (j + 1 <= range && data[j] > data[j - 1]) j++
        if (data[j - 1] < data[k - 1]) break
        await Fn(j - 1, k - 1)
        k = j
      }
    }
  }
}
