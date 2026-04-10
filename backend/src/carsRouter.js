import { Router } from 'express'
import {
  handleGetAll,
  handleGetById,
  handleAdd,
  handleUpdate,
  handleDelete,
} from './carsController.js'

const carsRouter = Router()

carsRouter.get('/', handleGetAll)
carsRouter.get('/:id', handleGetById)
carsRouter.post('/', handleAdd)
carsRouter.patch('/:id', handleUpdate)
carsRouter.delete('/:id', handleDelete)

export default carsRouter
