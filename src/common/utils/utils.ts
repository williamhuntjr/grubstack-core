export const cls = (...classes: (string | false | undefined)[]): string => classes.filter(Boolean).join(' ')
export function capitalize (word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1)
}