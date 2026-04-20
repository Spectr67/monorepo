import { getKlines } from './klinesApi.js'
import { getKlinesByTokenName, setKlinesByTokenName } from './klinesModel.js'

export async function handleUpdateKlinesByTokenName(tokenName) {
  const klines = await getKlines(tokenName)
  setKlinesByTokenName(tokenName, klines)
}

export function handleGetKninesByTokenName(tokenName) {
  return getKlinesByTokenName(tokenName)
}

// console.log(handleGetKninesByTokenName('BTC'))

// await handleUpdateKlinesByTokenName('BTC')

// console.log(handleGetKninesByTokenName('BTC'))
