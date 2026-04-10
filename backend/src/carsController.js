import {
  getCarsAll,
  getCarsById,
  addCar,
  updateCarById,
  deleteCarById,
} from './carsModel.js'

export function handleGetAll(req, res) {
  const cars = getCarsAll()
  res.status(200).send(cars)
}
export function handleGetById(req, res) {
  const car = getCarsById(+req.params.id)
  if (!car) res.status(404).send('opps')
  else res.status(200).send(car)
}
export function handleAdd(req, res) {
  const createdCar = addCar(req.body)
  res.status(201).send(createdCar)
}
export function handleUpdate(req, res) {
  const car = updateCarById(+req.params.id, req.body)
  if (!car) res.status(404).send('opps')
  else res.status(200).send(car)
}
export function handleDelete(req, res) {
  if (!deleteCarById(+req.params.id)) res.status(404).send('opps')
  else res.status(204).send()
}
