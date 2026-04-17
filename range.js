let list = []

function calcRange() {
  const percents = []
  const min = Math.min(...list)
  const max = Math.max(...list)
  const delta = max - min
  const fn = x => (((x - min) / delta) * 100).toFixed(2) + '%'
  return list.map(fn)

  // console.log(fn(20))
  // console.log(fn(80))
  // console.log(fn(50))
}

list.push(42, 44, 33)

let result = calcRange()

list

result
