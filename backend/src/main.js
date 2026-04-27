import express from 'express'
import path from 'node:path'
import cors from 'cors'
import carsRouter from './cars/carsRouter.js'
import bikesRouter from './bikes/bikesRouter.js'
import klinesRouter from './klines/klinesRouter.js'
import coinsRouter from './coins/coinsRouter.js'

const app = express()
const PORT = 3000
const projectRoot = path.join(import.meta.dirname, '..', '..')
const prodFolder = path.join(projectRoot, 'build', 'client')
const devFolder = path.join(projectRoot, 'backend', 'static')
let staticFolder = import.meta.dirname.includes('src') ? devFolder : prodFolder

console.log('CURRENT STATIC FOLDER:')
console.log(staticFolder)

app.use(cors())
app.use(express.json())

app.use('/api/v0/cars', carsRouter)
app.use('/api/v0/bikes', bikesRouter)
app.use('/api/v0/klines', klinesRouter)
app.use('/api/v0/coins', coinsRouter)

app.use('/', express.static(staticFolder))

app.get('/api/v0/{*any}', (req, res) => res.status(404).send('not found...'))

app.listen(PORT, () =>
  console.log('server started at:', 'http://localhost:' + PORT),
)
