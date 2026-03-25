import express from 'express'
import path from 'node:path'
import carsRouter from './carsRouter.js'

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

app.use('/api/v0', carsRouter)

app.use('/', express.static(staticFolder))

// app.get('/api/v0/hello', (req, res) => {
//   res.send('hello world')
// })

app.get('/api/v0/{*any}', (req, res) => res.status(404).send('not found...'))

app.listen(PORT, () =>
  console.log('server started at:', 'http://localhost:' + PORT),
)
