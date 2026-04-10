import { Router } from 'express'
import {
  handleGetAll,
  handleGetById,
  handleAdd,
  handleUpdate,
  handleDelete,
} from './carsController.js'

const carsRouter = Router()

carsRouter.get('/cars', handleGetAll)
carsRouter.get('/cars/:id', handleGetById)
carsRouter.post('/cars', handleAdd)
carsRouter.patch('/cars/:id', handleUpdate)
carsRouter.delete('/cars/:id', handleDelete)

export default carsRouter
