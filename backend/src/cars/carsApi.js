const BASE_URL = 'http://localhost:3000/api/v0/cars'

export async function loadCars() {
  const resp = await fetch(BASE_URL)
  return await resp.json()
}
