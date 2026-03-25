import { Router } from 'express'
import cars from './cars.js'

const carsRouter = Router()

carsRouter.get('/cars', (req, res) => {
  res.status(200).send(cars)
})

carsRouter.get('/cars/:id', (req, res) => {
  const car = cars.find(car => car.id === +req.params.id)
  if (!car) {
    res.status(404).send('opps')
  } else {
    res.status(200).send(car)
  }
})

carsRouter.delete('/cars/:id', (req, res) => {
  const idx = cars.findIndex(car => car.id === +req.params.id)
  if (idx === -1) {
    res.status(404).send('opps')
  } else {
    cars.splice(idx, 1)
    res.status(204).send()
  }
})

carsRouter.post('/cars', (req, res) => {
  const createdCar = { id: (Math.random() * 1000) >>> 0, ...req.body }
  cars.push(createdCar)
  res.status(201).send(createdCar)
})

carsRouter.patch('/cars/:id', (req, res) => {
  const car = cars.find(car => car.id === +req.params.id)
  Object.assign(car, req.body)
  res.status(200).send(car)
})

export default carsRouter
