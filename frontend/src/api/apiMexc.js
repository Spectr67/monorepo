const BASE_URL = 'http://localhost:3000/api/v0/coins'

export async function fetchMexcListings(tokens = []) {
  try {
    const url =
      tokens.length > 0 ? `${BASE_URL}?tokens=${tokens.join(',')}` : BASE_URL

    const res = await fetch(url)

    if (!res.ok) throw new Error('Network response was not ok')

    return await res.json()
  } catch (error) {
    console.error('Failed to fetch MEXC data:', error)
    return []
  }
}
