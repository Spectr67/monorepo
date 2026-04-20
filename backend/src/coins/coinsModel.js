import { getKlines } from '../klines/klinesApi.js'
import coinsStorage from '../coins/coinsStorage.js'
import defaultTokens from '../mexc/mexcStorage.js'
import { percent } from '../utils.js'

export function addCoin(coin) {
  coinsStorage.push(coin)
}

export function getCoins() {
  return [...coinsStorage]
}

export function calculateCoin({ tokenName, stockName, klines }) {
  if (!klines || klines.length === 0) return null

  const firstDay = klines[0]
  const day3 = klines[3] ?? null
  const day33 = klines[33] ?? null
  const lastDay = klines[klines.length - 1]

  const listingPrice = firstDay.close
  const currentPrice = lastDay.close

  return {
    stockName,
    tokenName,
    listingTime: firstDay.openTime,
    listingPrice,
    price3d: day3?.close ?? null,
    change3d: day3 ? percent(listingPrice, day3.close) : null,
    price33d: day33?.close ?? null,
    change33d: day33 ? percent(listingPrice, day33.close) : null,
    currentPrice,
    changeNow: percent(listingPrice, currentPrice),
    chartLink: `https://www.mexc.com/exchange/${tokenName.toUpperCase()}_USDT`,
  }
}

// export async function refreshCoinsData() {
//   const results = []

//   for (const token of defaultTokens) {
//     const klines = await getKlines(token)
//     const analyzedCoin = calculateCoin({
//       tokenName: token,
//       stockName: 'MEXC',
//       klines,
//     })

//     if (analyzedCoin) results.push(analyzedCoin)
//     await sleep(200)
//   }

//   coinsStorage.length = 0
//   coinsStorage.push(...results)

//   return coinsStorage
// }

// export function getCoinsAll() {
//   return [...coinsStorage]
// }
// tokensNamesStorage.mexc.forEach(async tokenName => {
//   const klines = await getKlinesMexc()
//   const coin = calculateCoin({ tokenName, stockName: 'MEXC', klines })
//   coinsStorage.push(coin)
// })

// export async function calculateCoins({ tokensNames, stockName, getKlines }) {
//   const results = []

//   for (const tokenName of tokensNames) {
//     console.log(`Fetching ${tokenName} from ${stockName}...`)
//     const klines = await getKlines(tokenName, 35)

//     const data = calculateCoin({ tokenName, stockName, klines })

//     if (data) {
//       results.push(data)
//     }

//     await sleep(150)
//   }

//   return results
// }
