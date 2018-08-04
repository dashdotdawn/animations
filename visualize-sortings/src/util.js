export function generateList(count) {
  var items = []
  for (var i = 1; i < count + 1; i++) {
    items.push(i)
  }
  return shuffle(items)
}

export function shuffle(arr) {
  var copyArr = arr.slice()
  for (var i = 0; i < arr.length; i++) {
    let randomIndex = Math.floor(Math.random() * (i + 1))
    let temp = copyArr[randomIndex]
    copyArr[randomIndex] = copyArr[i]
    copyArr[i] = temp
  }
  return copyArr
}

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
