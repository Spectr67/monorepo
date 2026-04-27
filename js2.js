function formatPrice(val) {
  if (!val) return '0.00'
  return val < 0.01 ? val.toFixed(8) : val.toFixed(4)
}

let result

// result = formatPrice(123)
// console.log(result)

// result = formatPrice(123.123)
// console.log(result)

// result = formatPrice(0.123)
// console.log(result)

// result = formatPrice(0.0023) // 0.0023
// console.log(result)

// result = formatPrice(0.000023456) // 0.000023
// console.log(result)

console.log((12.3456).toPrecision(3))
console.log((123.456).toPrecision(3))
console.log(+(1234.56).toPrecision(3))
console.log(+(12345.6).toPrecision(3))
// .toFixed  метод чисел, возвращает строку
// .toPrecision метод чисел, возвращает строку
