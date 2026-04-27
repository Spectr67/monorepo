const BASE_URL = 'http://localhost:3000/api/v0/coins'

export async function getCoins() {
  const resp = await fetch(BASE_URL)
  const json = await resp.json()
  return json
}
