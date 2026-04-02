export async function postItem(dto, path) {
  const resp = await fetch(`http://localhost:3000/api/v0/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  })

  return await resp.json()
}
