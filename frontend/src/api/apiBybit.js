const BASE_URL = 'https://api.bybit.com/v5/'
const KLINE_URL = `${BASE_URL}market/kline?category=spot&interval=D&symbol=`

export async function getKlinesBybit(tokenName, limit = 35, start = 0) {
  const url = `${KLINE_URL}${tokenName.toUpperCase()}USDT&limit=${limit}&start=${start}`

  const res = await fetch(url)
  const json = await res.json()

  const list = json?.result?.list

  if (!Array.isArray(list)) {
    console.error('Bybit error:', json)
    return []
  }

  return list.toReversed().map(candle => {
    const openTime = Number(candle[0])

    return {
      openTime,
      open: Number(candle[1]),
      high: Number(candle[2]),
      low: Number(candle[3]),
      close: Number(candle[4]),
      volume: Number(candle[5]),
      quoteVolume: Number(candle[6]),
      closeTime: openTime + 24 * 60 * 60 * 1000,
    }
  })
}

export async function getKlines(tokenName, limit = 35, start = 0) {
  return await getKlinesBybit(tokenName, limit, start)
}

async function test() {
  const result = await getKlines('BTC', 10)

  console.log('📊 BYBIT RESULT:')
  console.log(result)
}
test()
