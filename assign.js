const car = { x: 42 }

const dto = { x: 101 }

Object.assign(car, dto)

console.log(car.x)

dto.x = 33

console.log(car.x)

//

// const o = { a: 2 }
// Object.assign(o, { a: 1 }, { a: 1 })
// o
