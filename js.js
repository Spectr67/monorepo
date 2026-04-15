let a = [42]
console.log(a)
a = [101]
console.log(a)
a.push(...[33], ...[12], 12)

console.log(a)
a.length = 0
console.log(a)
