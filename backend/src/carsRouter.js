import { Router } from 'express'
import {
  getCarsAll,
  getCarsById,
  addCar,
  updateCarById,
  deleteCarById,
} from './carsModel.js'

const carsRouter = Router()

carsRouter.get('/cars', (req, res) => {
  const cars = getCarsAll()
  res.status(200).send(cars)
})

carsRouter.get('/cars/:id', (req, res) => {
  const car = getCarsById(+req.params.id)
  if (!car) res.status(404).send('opps')
  else res.status(200).send(car)
})

carsRouter.post('/cars', (req, res) => {
  const createdCar = addCar(req.body)
  res.status(201).send(createdCar)
})

carsRouter.patch('/cars/:id', (req, res) => {
  const car = updateCarById(+req.params.id, req.body)
  if (!car) res.status(404).send('opps')
  else res.status(200).send(car)
})

carsRouter.delete('/cars/:id', (req, res) => {
  if (!deleteCarById(+req.params.id)) res.status(404).send('opps')
  else res.status(204).send()
})

export default carsRouter
