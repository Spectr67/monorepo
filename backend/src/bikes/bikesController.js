import {
  getBikesAll,
  getBikesById,
  addBike,
  updateBikeById,
  deleteBikeById,
} from './bikesModel.js'

export function handleGetAll(req, res) {
  const bikes = getBikesAll()
  res.status(200).send(bikes)
}
export function handleGetById(req, res) {
  const bike = getBikesById(+req.params.id)
  if (!bike) res.status(404).send('opps')
  else res.status(200).send(bike)
}
export function handleAdd(req, res) {
  const createdBike = addBike(req.body)
  res.status(201).send(createdBike)
}
export function handleUpdate(req, res) {
  const bike = updateBikeById(+req.params.id, req.body)
  if (!bike) res.status(404).send('opps')
  else res.status(200).send(bike)
}
export function handleDelete(req, res) {
  if (!deleteBikeById(+req.params.id)) res.status(404).send('opps')
  else res.status(204).send()
}
