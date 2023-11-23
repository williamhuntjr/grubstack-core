function isKey<T extends { [K in keyof T]: T[K] }>(key: unknown, filtersPanelState: T): key is keyof T {
  return typeof key === 'string' && Object.prototype.hasOwnProperty.call(filtersPanelState, key)
}

export function checkAndCreateFiltersObject<TValue extends { [key: string]: TValue[keyof TValue] }>(filter?: TValue): Partial<TValue> {
  if (!filter) {
    return {}
  }
  const keys: Array<keyof TValue> = Object.keys(filter).filter((key) => isKey<TValue>(key, filter))
  return Object.values(filter).reduce((res, value, index) => {
    const key = keys[index]
    if (typeof value === 'number' || value) {
      res[key] = value
    }
    return res
  }, {} as TValue)
}
