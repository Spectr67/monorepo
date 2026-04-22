import { Router } from 'express'
import {
  handleGetCoins,
  // handleGetById,
  // handleAdd,
  // handleUpdate,
  // handleDelete,
} from '../coins/coinsController.js'

const coinsRouter = Router()

coinsRouter.get('/', handleGetCoins)
// coinsRouter.get('/:id', handleGetById)
// coinsRouter.post('/', handleAdd)
// coinsRouter.patch('/:id', handleUpdate)
// coinsRouter.delete('/:id', handleDelete)

export default coinsRouter
