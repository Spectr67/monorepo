function formatPercent(val) {
  val ??= '—'
  return (val > 0 ? '+' : '') + val + '%'
}

// return val ?? '—'

let result

result = formatPercent(0)
console.log(result)
result = formatPercent(42)
console.log(result)
result = formatPercent(-42)
console.log(result)

// let x
// console.log(x ?? 'yo')

// x = null
// console.log(x ?? 'yo')

// x = false
// console.log(x ?? 'yo')

// x = 0
// console.log(x ?? 'yo')

// x = ''
// console.log(x ?? 'yo')

// ?? оператор нулевого слияния - возвращает правую операнду, если слева
// null или undefined

// логические операторы:
// && - И
// || - ИЛИ
// ! - НЕ
