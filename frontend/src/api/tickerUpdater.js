const apiUrl = 'https://api.binance.com/api/v3/ticker/'
const apiUrl2 = 'https://api.binance.com/api/v3/klines?'

const convertCandle = ([a]) => ({
  t: round(a[0]),
  o: round(a[1]),
  h: round(a[2]),
  l: round(a[3]),
  c: round(a[4]),
})

function round(price) {
  price = parseFloat(price)
  price = price < 1 ? price.toPrecision(2) : price.toFixed(2)
  return +price
}

export async function getPriceBySymbol2(symbol) {
  const resp = await fetch(`${apiUrl2}symbol=${symbol}&interval=1s&limit=1`)
  const json = await resp.json()
  return convertCandle(json)
}

export function priceUpdater2(symbol, cb) {
  setInterval(() => getPriceBySymbol2(symbol).then(cb), 1000)
}

export async function getSymbolsAll() {
  const response = await fetch('https://api.binance.com/api/v3/exchangeInfo')
  const data = await response.json()
  return data.symbols
    .filter(
      symbol => symbol.quoteAsset === 'USDT' && symbol.status === 'TRADING',
    )
    .map(symbol => symbol.symbol)
  // .toSorted((a, b) => a.name.localeCompare(b.symbol))
}

// [[1780692879000,"61516.72000000","61516.72000000","61516.71000000","61516.72000000","0.03570000",1780692879999,"2196.14687210",3,"0.03251000","1999.90856720","0"]]
