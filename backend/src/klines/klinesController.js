import { getKlines } from './klinesApi.js'
import {
  getKlinesAll,
  getKlinesByTokenName,
  setKlinesByTokenName,
} from './klinesModel.js'

export async function handleUpdateKlinesByTokenName(tokenName) {
  const klines = await getKlines(tokenName)
  setKlinesByTokenName(tokenName, klines)
}

export function handleGetKlinesByTokenName(tokenName) {
  return getKlinesByTokenName(tokenName)
}

export function handleGetAll(req, res) {
  const cars = getKlinesAll()
  res.status(200).send(cars)
}

// console.log(handleGetKninesByTokenName('BTC'))

// handleUpdateKlinesByTokenName('BTC')
// handleUpdateKlinesByTokenName('ETH')

// console.log(handleGetKninesByTokenName('BTC'))
