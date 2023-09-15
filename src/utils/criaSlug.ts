export function criarSlug(string: string) {
  const slug = string
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s]+/g, '-')

  return slug
}
