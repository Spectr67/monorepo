import express from 'express'
// import path from 'node:path'

const app = express()
const PORT = 3000

// C:\Users\Рабочий стол\папка с пробелами'

// const clientFolder =
//   '/home/yourock/d/Mentoring/students/artur/monorepo/backend/static/'

const clientFolder =
  '/home/yourock/d/Mentoring/students/artur/monorepo/build/client/'

// TODO: сделать так чтоб в dev режиме не раздавалась клиентская папка
app.use('/', express.static(clientFolder))

app.get('/api/v0/hello', (req, res) => res.send('Hello express api!'))
app.get('/api/v0/{*any}', (req, res) => res.status(404).send('not found...'))

app.listen(PORT, () =>
  console.log('server started at:', 'http://localhost:' + PORT)
)
