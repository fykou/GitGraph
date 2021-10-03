export function stringToUnixDate(date: string): Date {
  return new Date(date.split(',')[0].split('.').reverse().join('/'))
}
