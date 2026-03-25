import express from 'express'
import path from 'node:path'
import cars from './cars.js'

const app = express()
const PORT = 3000

const projectRoot = path.join(import.meta.dirname, '..', '..')
const prodFolder = path.join(projectRoot, 'build', 'client')
const devFolder = path.join(projectRoot, 'backend', 'static')
let staticFolder = import.meta.dirname.includes('src') ? devFolder : prodFolder

console.log('CURRENT STATIC FOLDER:')
console.log(staticFolder)

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  next()
})

app.use('/', express.static(staticFolder))

// app.get('/api/v0/hello', (req, res) => {
//   res.send('hello world')
// })

app.get('/api/v0/cars', (req, res) => {
  res.status(200).send(cars)
})

app.get('/api/v0/cars/:id', (req, res) => {
  const car = cars.find(car => car.id === +req.params.id)
  if (!car) {
    res.status(404).send('opps')
  } else {
    res.status(200).send(car)
  }
})

app.delete('/api/v0/cars/:id', (req, res) => {
  const idx = cars.findIndex(car => car.id === +req.params.id)
  if (idx === -1) {
    res.status(404).send('opps')
  } else {
    cars.splice(idx, 1)
    res.status(204).send()
  }
})

app.post('/api/v0/cars', (req, res) => {
  const createdCar = { id: (Math.random() * 1000) >>> 0, ...req.body }
  cars.push(createdCar)
  res.status(201).send(createdCar)
})

app.patch('/api/v0/cars/:id', (req, res) => {
  const car = cars.find(car => car.id === +req.params.id)
  Object.assign(car, req.body)
  res.status(200).send(car)
})

app.get('/api/v0/{*any}', (req, res) => res.status(404).send('not found...'))

app.listen(PORT, () =>
  console.log('server started at:', 'http://localhost:' + PORT),
)
