export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const percent = (from, to) => {
  if (!from || !to) return null
  return +(((to - from) / from) * 100).toFixed(2)
}
