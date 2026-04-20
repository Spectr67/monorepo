import { refreshCoinsData, getCoinsAll } from '../coins/coinsModel.js'

export async function handleGetMexcListings(req, res) {
  try {
    const coins = await refreshCoinsData()

    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
    res.end(JSON.stringify(coins))
  } catch (error) {
    res.writeHead(500)
    res.end(JSON.stringify({ error: error.message }))
  }
}
