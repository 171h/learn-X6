export function randomInt(max?: number) {
  if (!max)
    max = 500
  return Math.floor(Math.random() * max)
}

export function randomFloat(max?: number) {
  if (!max)
    max = 3
  return Math.random() * max
}
