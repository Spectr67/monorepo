import carsStorage from './carsStorage.js'

function createCar(dto) {
  return {
    id: (Math.random() * 10000) >>> 0,
    ...dto,
  }
}

export function addCar(dto) {
  const createdCar = createCar(dto)
  carsStorage.push(createdCar)
  return createdCar
}

// export const getCarsAll = [...carsStorage]

export function getCarsAll() {
  return [...carsStorage.map(cs => ({ ...cs }))]
}

export function getCarsById(id) {
  return carsStorage.find(cs => cs.id === id)
}

export function deleteCarById(id) {
  let idx = carsStorage.findIndex(cs => cs.id === id)
  if (idx === -1) return false
  carsStorage.splice(idx, 1)
  return true
}
