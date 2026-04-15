// backend/src/mexc/mexcModel.js

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
