/**
 * Binds all the class instance methods to the instance itself to prevent any issues with JS context.
 * @param instance
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function bindAllInstanceMethods<T extends Record<string, any>>(instance: T): void {
  function isMethodProperty(property: unknown): property is CallableFunction {
    return typeof property === 'function'
  }

  const selfProtoKeys: Array<keyof T> = Object.getOwnPropertyNames(Object.getPrototypeOf(instance)) as Array<keyof T>
  selfProtoKeys.forEach((key) => {
    const property = instance[key]
    if (isMethodProperty(property)) {
      // eslint-disable-next-line no-param-reassign
      instance[key] = property.bind(instance)
    }
  })
}
