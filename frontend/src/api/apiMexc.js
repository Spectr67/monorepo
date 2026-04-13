const BASE_URL = 'https://api.mexc.com/api/v3/'

export async function getKlinesMexc(tokenName, limit = 35) {
  const url = `${BASE_URL}klines?symbol=${tokenName.toUpperCase()}USDT&interval=1d&limit=${limit}`
  const res = await fetch(url)
  const data = await res.json()

  if (!Array.isArray(data)) {
    console.error('MEXC error:', data)
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
}
let x = await getKlinesMexc('BTC', 35)
console.log(x)
