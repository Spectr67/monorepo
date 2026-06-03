const apiUrl = 'https://api.binance.com/api/v3/ticker/'

function round(price) {
  price = parseFloat(price)
  price = price < 1 ? price.toPrecision(2) : price.toFixed(2)
  return +price
}

export async function getTickerBySymbol(symbol) {
  const resp = await fetch(`${apiUrl}price?symbol=${symbol}`)
  const json = await resp.json()
  return round(json.price)
}

export function wrap(cb) {
  setInterval(async () => {
    const price = await getTickerBySymbol('BTCUSDT')
    cb(price)
    return
  }, 2000)
  return
}

// wrap(x => {
//   console.log('yo!', x)
//   return
// })

// wrap(console.log)

// wrap(console.log('yo!'))
