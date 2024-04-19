export const cls = (...classes: (string | false | undefined)[]): string => classes.filter(Boolean).join(' ')
export function capitalize (word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export function camelCase(str: string): string {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase()
  }).replace(/\s+/g, '')
}