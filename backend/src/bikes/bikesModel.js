import bikesStorage from './bikesStorage.js'

function createBike(dto) {
  return { ...dto, id: (Math.random() * 10000) >>> 0 }
}

export function getBikesAll() {
  return [...bikesStorage.map(cs => ({ ...cs }))]
}

export function getBikesById(id) {
  return bikesStorage.find(cs => cs.id === id) ?? null
}

export function addBike(dto) {
  const createdBike = createBike(dto)
  bikesStorage.push(createdBike)
  return createdBike
}

export function updateBikeById(id, dto) {
  const bike = bikesStorage.find(bike => bike.id === id)
  if (!bike) return null
  delete dto.id
  Object.assign(bike, dto)
  return { ...bike }
}

export function deleteBikeById(id) {
  let idx = bikesStorage.findIndex(cs => cs.id === id)
  if (idx === -1) return false
  bikesStorage.splice(idx, 1)
  return true
}
