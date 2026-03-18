import express from 'express'
// import path from 'node:path'

const app = express()
const PORT = 3000

// C:\Users\Рабочий стол\папка с пробелами'

// const clientFolder =
//   '/home/yourock/d/Mentoring/students/artur/monorepo/backend/static/'

const cars = [
  {
    id: 1,
    brand: 'Audi',
    price: 21000,
  },
  {
    id: 2,
    brand: 'Ford',
    price: 33000,
  },
  {
    id: 3,
    brand: 'Fiat',
    price: 42000,
  },
]

const clientFolder =
  'C/Users/layz3/OneDrive/Documents/Important Stuff/Arthur/js_vue/monorepo/build/client/'
// '/home/yourock/d/Mentoring/students/artur/monorepo/build/client/'

// TODO: сделать так чтоб в dev режиме не раздавалась клиентская папка
app.use('/', express.static(clientFolder))

// app.get('/api/v0/hello', (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
//   res.send('122222')
// })

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
