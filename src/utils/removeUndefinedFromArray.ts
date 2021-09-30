export function removeUndefinedFromArray<A>(
  array: Array<A | undefined>
): Array<A> {
  return array.flatMap((a) => (a !== undefined ? [a] : []))
}
