import * as mexcModel from './mexcModel.js'
import defaultTokens from './mexcStorage.js'

export const getMexcListings = async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`)
    const tokensParam = url.searchParams.get('tokens')

    const tokens = tokensParam ? tokensParam.split(',') : defaultTokens

    const results = await mexcModel.getListingData({
      list: tokens,
      exchange: 'MEXC',
      getKlines: mexcModel.getKlinesMexc,
    })
    console.log(results)
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
    res.end(JSON.stringify(results))
  } catch (error) {
    res.writeHead(500)
    res.end(JSON.stringify({ error: error.message }))
  }
}
