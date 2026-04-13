// backend/src/mexc/mexcModel.js

const BASE_URL = 'https://api.mexc.com/api/v3/'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const percent = (from, to) => {
  if (!from || !to) return null
  return +(((to - from) / from) * 100).toFixed(2)
}

export async function getKlinesMexc(tokenName, limit = 35) {
  const url = `${BASE_URL}klines?symbol=${tokenName.toUpperCase()}USDT&interval=1d&limit=${limit}`
  try {
    const res = await fetch(url)
    const data = await res.json()

    if (!Array.isArray(data)) {
      console.error(`MEXC error for ${tokenName}:`, data)
      return []
    }

    return data.map(candle => ({
      openTime: candle[0],
      open: Number(candle[1]),
      high: Number(candle[2]),
      low: Number(candle[3]),
      close: Number(candle[4]),
      volume: Number(candle[5]),
      closeTime: candle[6],
      quoteVolume: Number(candle[7]),
    }))
  } catch (error) {
    console.error(`Fetch error for ${tokenName}:`, error)
    return []
  }
}

export function analyzeToken({ tokenName, exchange, klines }) {
  if (!klines || klines.length === 0) return null

  const firstDay = klines[0]
  const day3 = klines[3] ?? null
  const day33 = klines[33] ?? null
  const lastDay = klines[klines.length - 1]

  const listingPrice = firstDay.close
  const currentPrice = lastDay.close

  return {
    exchange,
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

export async function getListingData({ list, exchange, getKlines }) {
  const results = []

  for (const tokenName of list) {
    console.log(`Fetching ${tokenName} from ${exchange}...`)
    const klines = await getKlines(tokenName, 35)

    const data = analyzeToken({
      tokenName,
      exchange,
      klines,
    })

    if (data) {
      results.push(data)
    }

    await sleep(150)
  }

  return results
}
