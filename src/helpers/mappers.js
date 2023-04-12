export const mapText = (text, limit) => {
  if (text.length > limit) {
    return text.trim().slice(0, limit) + '...'
  }
  return text.trim()
}
