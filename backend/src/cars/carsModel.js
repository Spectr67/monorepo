import carsStorage from './carsStorage.js'

function createCar(dto) {
  return { ...dto, id: (Math.random() * 10000) >>> 0 }
}

export function setCars(cars) {
  carsStorage.length = 0
  carsStorage.push(...cars)
}

export function getCarsAll() {
  return [...carsStorage.map(cs => ({ ...cs }))]
}

export function getCarsById(id) {
  return carsStorage.find(cs => cs.id === id) ?? null
}

export function addCar(dto) {
  const createdCar = createCar(dto)
  carsStorage.push(createdCar)
  return createdCar
}

export function updateCarById(id, dto) {
  const car = carsStorage.find(car => car.id === id)
  if (!car) return null
  delete dto.id
  Object.assign(car, dto)
  return { ...car }
}

export function deleteCarById(id) {
  let idx = carsStorage.findIndex(cs => cs.id === id)
  if (idx === -1) return false
  carsStorage.splice(idx, 1)
  return true
}
