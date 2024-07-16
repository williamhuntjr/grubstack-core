import { IProperty } from './restaurant.types'

export function getProperty(properties: IProperty[], key: string): string | undefined {
  const filtered = properties.filter((property) => property.key == key)
  return filtered.length > 0 ? filtered[0].value : undefined
}
