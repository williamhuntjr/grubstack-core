import { IInjector, Scope } from './injector.types'

interface IContainerItem<T> {
  scope: Scope
  instance?: T
  factory: (injector: IInjector) => T
}

// TODO cover with unit tests
class InjectorService implements IInjector {
  private container: Map<string, IContainerItem<unknown>> = new Map()

  public register<T>(key: string, factory: (injector: IInjector) => T, scope: Scope): void {
    if (scope === Scope.Prototype) {
      this.container.set(key, { scope, factory })
    } else {
      const instance = factory(this)
      this.container.set(key, { scope, instance, factory })
    }
  }

  public resolve<T>(key: string): T {
    const item = this.container.get(key)
    if (!item) {
      throw new Error(`Instance ${key} is not registered in the container`)
    }
    if (item.scope === Scope.Singleton) {
      return item.instance as T
    }
    return item.factory(this) as T
  }
}

export const Injector: IInjector = new InjectorService()
