import klinesStorage from './klinesStorage.js'

export function setKlinesByTokenName(tokenName, klines) {
  klinesStorage[tokenName] = klines
}

export function getKlinesByTokenName(tokenName) {
  return klinesStorage[tokenName] ?? []
}
