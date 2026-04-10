import { Router } from 'express'
import {
  handleGetAll,
  handleGetById,
  handleAdd,
  handleUpdate,
  handleDelete,
} from './bikesController.js'

const bikesRouter = Router()

bikesRouter.get('/', handleGetAll)
bikesRouter.get('/:id', handleGetById)
bikesRouter.post('/', handleAdd)
bikesRouter.patch('/:id', handleUpdate)
bikesRouter.delete('/:id', handleDelete)

export default bikesRouter
