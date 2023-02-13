export function convertToStringValues(object: { [key: string]: any }): { [key: string]: string } {
  return Object.fromEntries(
    Object.entries(object)
      .map(([key, val]) => [key, String(val)])
  )
}