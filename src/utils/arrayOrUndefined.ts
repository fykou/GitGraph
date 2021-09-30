export function arrayOrUndefined<A>(array: A[]): A[] | undefined {
  if (array.length === 0) {
    return undefined
  }
  return array
}
