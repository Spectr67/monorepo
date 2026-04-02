const BASE_URL = 'http://localhost:3000/api/v0/cars'

export async function postItem(dto) {
  const resp = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  })

  return await resp.json()
}

export async function loadCars() {
  const resp = await fetch(BASE_URL)
  return await resp.json()
}

export async function deleteCar(id) {
  await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })
}

export async function updateCar(id, dto) {
  const resp = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  })

  return await resp.json()
}
