import {
  handleGetKninesByTokenName,
  handleUpdateKlinesByTokenName,
} from '../klines/klinesController.js'
import { sleep } from '../utils.js'
import { addCoin, calculateCoin, getCoins } from './coinsModel.js'

async function handleAddCoinByTokenName(tokenName) {
  await handleUpdateKlinesByTokenName('BTC')
  const klines = handleGetKlinesByTokenName('BTC')
  const coin = calculateCoin({ tokenName, stockName: 'mexc', klines })
  addCoin(coin)
}

function handleGetCoins() {
  return getCoins()
}

// function handleGetLastCoin() {
//   return getLastCoin
// }

function cleanCoins() {
  // body
}

// cleanCoins()
// tokenNamesList.forEach(tokenName => {
//   await handleAddCoinByTokenName(tokenName)
//   console.log(handleGetCoins())
// })

let flag = false
async function handleRun() {
  if (flag) return
  flag = true
  for (const tokenName of tokenNames) {
    await handleAddCoinByTokenName(tokenName)
    await sleep(500)
  }
  flag = false
}

console.log(handleGetCoins())
await handleAddCoinByTokenName('BTC')
console.log(handleGetCoins())
await sleep(200)
await handleAddCoinByTokenName('ETH')
console.log(handleGetCoins())
