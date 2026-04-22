import { Router } from 'express'
import {
  handleGetAll,
  // handleGetById,
  // handleAdd,
  // handleUpdate,
  // handleDelete,
} from './klinesController.js'

const klinesRouter = Router()

klinesRouter.get('/', handleGetAll)
// klinesRouter.get('/:id', handleGetById)
// klinesRouter.post('/', handleAdd)
// klinesRouter.patch('/:id', handleUpdate)
// klinesRouter.delete('/:id', handleDelete)

export default klinesRouter
