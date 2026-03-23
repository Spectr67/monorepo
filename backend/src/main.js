import express from 'express'
import path from 'node:path'
import './functions/add.js'
import './utils.js'
import cars from './cars.js'

const app = express()
const PORT = 3000

const projectRoot = path.join(import.meta.dirname, '..', '..')
const prodFolder = path.join(projectRoot, 'build', 'client')
const devFolder = path.join(projectRoot, 'backend', 'static')
let staticFolder = import.meta.dirname.includes('src') ? devFolder : prodFolder

console.log('CURRENT STATIC FOLDER:')
console.log(staticFolder)

app.use('/', express.static(staticFolder))

app.get('/api/v0/hello', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.send('hello world')
})

app.get('/api/v0/cars', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.status(200).send(cars)
})

app.get('/api/v0/cars/:id', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  const car = cars.find(car => car.id === +req.params.id)
  if (!car) {
    res.status(404).send('opps')
  } else {
    res.status(200).send(car)
  }
})

app.get('/api/v0/{*any}', (req, res) => res.status(404).send('not found...'))

app.listen(PORT, () =>
  console.log('server started at:', 'http://localhost:' + PORT)
)

// !!!
