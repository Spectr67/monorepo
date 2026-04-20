const BASE_URL = 'https://api.mexc.com/api/v3/'

// getKlinesByTokenName
export async function getKlines(tokenName, limit = 35) {
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

// getKlinesMexc('BTC').then(console.log)
