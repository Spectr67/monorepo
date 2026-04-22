import {
  handleGetKlinesByTokenName,
  handleUpdateKlinesByTokenName,
} from '../klines/klinesController.js'
import tokensNamesStorage from '../tokensNames/tokensNamesStorage.js'
import { sleep } from '../utils.js'
import { addCoin, calculateCoin, getCoins } from './coinsModel.js'

async function handleAddCoinByTokenName(tokenName) {
  await handleUpdateKlinesByTokenName(tokenName)
  const klines = handleGetKlinesByTokenName(tokenName)
  const coin = calculateCoin({ tokenName, stockName: 'mexc', klines })
  addCoin(coin)
}

export function handleGetCoins(req, res) {
  const cars = getCoins()
  res.status(200).send(cars)
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
tokensNamesStorage
let flag = false
async function handleRun() {
  if (flag) return
  flag = true
  for (const tokenName of tokensNamesStorage.mexc) {
    await handleAddCoinByTokenName(tokenName)
    await sleep(2500)
  }
  flag = false
}

handleRun()

// console.log(handleGetCoins())
// await handleAddCoinByTokenName('BTC')
// await handleAddCoinByTokenName('ETH')
// console.log(handleGetCoins())
// await sleep(200)
// await handleAddCoinByTokenName('ETH')
// console.log(handleGetCoins())
