export enum Scope {
  Prototype,
  Singleton,
}

export interface IInjector {
  register<T>(key: string, factory: (injector: IInjector) => T, scope: Scope): void
  resolve<T>(key: string): T
}
