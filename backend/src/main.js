import express from 'express'
// import path from 'node:path'

const app = express()
const PORT = 3000

// const serverRoot =
//   '/home/yourock/d/Mentoring/students/artur/monorepo/backend/static/'
const clientFolder =
  '/home/yourock/d/Mentoring/students/artur/monorepo/build/client/'

app.use('/', express.static(clientFolder))

app.get('/hello', (req, res) => res.send('Hello express'))

app.listen(PORT, () => console.log('server started!'))
